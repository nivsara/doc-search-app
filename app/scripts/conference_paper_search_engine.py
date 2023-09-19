#!/usr/bin/env python

from pathlib import Path
from typing import List, Tuple
import pandas as pd
import numpy as np

from qdrant_client import models, QdrantClient
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT

import config as CONFIG

DATA_DIR = Path(CONFIG.DATA_DIR)
CONFERENCE_PAPER_DATA_PATH = DATA_DIR / CONFIG.CONFERENCE_PAPER_DATA_FILE_NAME
QDRANT_COLLECTION_NAME = CONFIG.COLLECTION_NAME


class ConferencePaperSearchEngine:
    def __init__(self, qdrant_client: QdrantClient, conference_paper_df: pd.DataFrame):
        self.encoder = SentenceTransformer('allenai-specter')
        self.qdrant_client = qdrant_client
        self.conference_paper_df = conference_paper_df
        
        print(f"Setting up Qdrant database...")
        try:
            qdrant_client.get_collection(QDRANT_COLLECTION_NAME)
        except Exception as e:
            print(f"Collection not found in Qdrant database. Setting up collection...")
            self.setup_qdrant()

    def encode_abstracts(self):
        """
        Encode abstracts using SentenceTransformer
        :return: None
        """
        batch_size = 32
        batch = []
        encode_batch = []
        for paper_details in self.conference_paper_df.itertuples():
            batch.append(paper_details.abstract_text)
            if len(batch) == batch_size:
                encode_batch.append(self.encoder.encode(batch))
                print(f"Encoded {len(encode_batch) * batch_size} abstracts...")
                batch = []

        if len(batch) > 0:
            encode_batch.append(self.encoder.encode(batch))

        print("Encoding complete!")

        encode_batch = np.concatenate(encode_batch)
        print(f"Saving encoded abstracts to {DATA_DIR / 'encoded_abstracts.npy'}...")
        np.save(str(DATA_DIR / 'encoded_abstracts.npy'), encode_batch, allow_pickle=False)

    def setup_qdrant(self, collection_name: str = QDRANT_COLLECTION_NAME):
        """
        Setup Qdrant instance
        :param collection_name: Name of collection to store conference papers
        :return: None
        """
        # Create collection to store conference papers in Qdrant
        if not (DATA_DIR / 'encoded_abstracts.npy').exists():
            print(f"Encoded abstracts not found. Encoding abstracts...")
            self.encode_abstracts()
            
        print(f"Loading encoded abstracts...")
        
        encoded_abstracts = np.load(str(DATA_DIR / 'encoded_abstracts.npy'))
        
        print(f"Creating collection {collection_name}...")
        self.qdrant_client.recreate_collection(
            collection_name=collection_name,
            on_disk_payload=True,
            vectors_config=models.VectorParams(
                size=self.encoder.get_sentence_embedding_dimension(), # Vector size is defined by used model
                distance=models.Distance.COSINE
            )
        )

        print(f"Uploading conference papers to collection {collection_name}...")
        self.qdrant_client.upload_records(
            collection_name=collection_name,
            records=[
                models.Record(
                    id=index,
                    vector=encoded_abstracts[index].tolist(),
                    payload=row.to_dict()
                ) for index, row in self.conference_paper_df.iterrows()
            ]
        )
        print(f"Collection {collection_name} setup complete!")
    
    def search_abstracts(self, query, limit=5):
        hits = self.qdrant_client.search(
            collection_name=QDRANT_COLLECTION_NAME,
            query_vector=self.encoder.encode(query).tolist(),
            limit=limit
        )
        return hits

    @staticmethod
    def transform_author_names(search_results: List[Tuple[str, float]]):
        for result in search_results:
            author_names = result.payload.get('authors')
            result.payload['authors'] = author_names.split(', ')
        return search_results
    
    def keyword_generator(self, search_results: List[Tuple[str, float]]):
        for result in search_results:
            abstract_text = result.payload.get('abstract_text')
            kw_model = KeyBERT(model=self.encoder)
            keywords = kw_model.extract_keywords(abstract_text, keyphrase_ngram_range=(1, 2))
            result.payload['keywords'] = [keyword for keyword, _ in keywords]
        return search_results

    def get_search_results(self, query: str, limit: int = 5):
        hits = self.search_abstracts(query, limit)
        hits = self.transform_author_names(hits)
        hits = self.keyword_generator(hits)
        return hits

