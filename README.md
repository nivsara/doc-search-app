# Conference paper search engine

## Introduction
This is a search engine for conference papers published in Conference on Neural Information Processing Systems (NeurIPS) from 1987 to 2022. More details about the conference can be found [here](https://nips.cc/). The search engine uses the data scrapped from the [NeurIPS website](https://papers.nips.cc/). The data can be found at `app/data/`.

The search engine is implemented in Python using FastAPI and the web interface is implemented using React web framework.

## How to run
The search engine can be run using Docker. To run the search engine, run the following command in the root directory of the project:
```bash
docker-compose -f docker-compose.yml up --build
```
The search engine can be accessed at `http://localhost:3000/`.

## How to use
The search engine can be used to search for conference papers. Just enter the query in the search bar and click on the search button. The search results will be displayed below the search bar.

## How it works
The available abstract are encoding using SPECTER model which is based on BERT, trained on scientific citations and these encodings can be used to estimate the similarity of two publications. Hence it makes sense to use this model, more technical details about SPECTER can be found [here](https://arxiv.org/abs/2004.07180). To realize SPECTER, Sentence Transformers can be used which is a Python framework for state-of-the-art sentence, text and image embeddings, more detials can be found [here](https://www.sbert.net/). The SPECTER is available under name `allenai-specter` in Sentence transformer framework.

The vectors are stored in a vector search engine for fast retrieval. This project will be using the [Qdrant vector search engine](https://qdrant.tech/) for this purpose. The abstracts of the scientific papers scapped from internet will be encoded using SPECTER model and the Qdrant vector search engine uses these encoding to index the conference papers. The same vector search engine is used to find the most similar conference papers to the query with the help of cosine similarity.

The search engine is implemented using FastAPI which is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. The web interface is implemented using React web framework. The Qdrant Cloud platform is used to host the vector search engine.

## More details

The app can be run separately using the following command for more understanding:
```bash
cd app
uvicorn main:app --reload
```
The app can be accessed at `http://localhost:8000/`.

