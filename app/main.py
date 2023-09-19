#!/usr/bin/env python

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel, Field
from pathlib import Path
import pandas as pd
from qdrant_client import QdrantClient
import os
from scripts.conference_paper_search_engine import ConferencePaperSearchEngine
import config as CONFIG


ENVIRONMENT = CONFIG.ENVIRONMENT
print(f"ENVIRONMENT: {ENVIRONMENT}")

DATA_DIR = Path(CONFIG.DATA_DIR)
CONFERENCE_PAPER_DATA_PATH = DATA_DIR / CONFIG.CONFERENCE_PAPER_DATA_FILE_NAME

API_KEY = CONFIG.QDRANT_CLIENT_API_KEY
QDRANT_URL = CONFIG.QDRANT_URL


app = FastAPI()

# CORS
origins = [
    "http://localhost:3000"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

print("Loading data...")
print(f"Current working directory: {os.path.dirname(__file__)}")
print(f"Loading data from {CONFERENCE_PAPER_DATA_PATH}...")
if CONFERENCE_PAPER_DATA_PATH.exists():
    conference_paper_df = pd.read_json(CONFERENCE_PAPER_DATA_PATH)

    print("Creating Qdrant client instance...")
    # Create Qdrant client instance
    if ENVIRONMENT == "prod":
        qdrant_client = QdrantClient(
                            url=QDRANT_URL, 
                            api_key=API_KEY,
                        ) # Create Qdrant instance
    else:
        qdrant_client = QdrantClient(":memory:")  # Create in-memory Qdrant instance
        
    print("Creating conference paper search engine instance...")
    conference_paper_search_engine = ConferencePaperSearchEngine(qdrant_client, conference_paper_df)
    
else:
    raise Exception(f"Please run the data_crawling script to scrap the data online or " +
                    "make sure data is saved to {CONFERENCE_PAPER_DATA_PATH} before running the API server.")


print("Starting API server...")


class ConferencePaper(BaseModel):
    title: str = Field(..., title="Title", description="Title of the paper")
    year: str = Field(..., title="Year", description="Year of publication")
    conference_name: str = Field(..., title="Conference name", description="Name of the conference")
    authors: list[str] = Field(..., title="Authors", description="List of authors")
    paper_link: str | None = Field(None, title="PDF link", description="Link to the pdf of the paper")
    abstract_text: str | None = Field(None, title="Abstract", description="Abstract of the paper")
    keywords: list[str] | None = Field(None, title="Keywords",
                                       description="List of main keywords representing the content of the paper")
    match_score: float = Field(..., title="Match score",
                               description="Score of the match between the query and the paper")

@app.get("/")
async def root():
    return {"message": "The API server is running."}

@app.get("/api/search")
async def search_abstract(
    query: Annotated[
        str, 
        Query(title="Query", description="Search query")],
    result_size: Annotated[
        int, 
        Query(
            title="Result size",
            description="Number of search results to return",
            alias="result-size"
            )
        ] = 5) -> list[ConferencePaper]:
    """
    A search API that returns the specified number of conference papers which match the query \n
    :param query: Search query \n
    :param result_size: Number of results to return \n
    :return: A list of conference papers that match the query \n
    """
    print(f"Query received: {query} \t Result size: {result_size}")
    search_result = conference_paper_search_engine.get_search_results(query, result_size)
    search_result = marshal_search_result(search_result)
    return search_result


def marshal_search_result(search_result):
    """
    Marshals the search result into a list of conference_paper objects
    """
    return [
        ConferencePaper(
            title=hit.payload["title"],
            year=hit.payload["year"],
            conference_name=hit.payload["conference_name"],
            authors=hit.payload["authors"],
            paper_link=hit.payload["paper_link"],
            abstract_text=hit.payload["abstract_text"],
            keywords=hit.payload["keywords"],
            match_score=hit.score,
        )
        for hit in search_result
    ]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)