#!/usr/bin/env python

import os

CODE_DIR = os.path.dirname(__file__)
# ROOT_DIR = os.path.dirname(CODE_DIR)
DATA_DIR = os.path.join(CODE_DIR, 'data')

COLLECTION_NAME = "conference_papers"
CONFERENCE_PAPER_DATA_FILE_NAME = 'nips_papers.json'
ENVIRONMENT = os.getenv("ENVIRONMENT", "dev")

QDRANT_URL = os.getenv("QDRANT_HOST",
                       r"https://cb3275a5-f0d6-406c-b7c3-c91f5062c932.us-east-1-0.aws.cloud.qdrant.io:6333")

QDRANT_CLIENT_API_KEY = os.getenv("QDRANT_CLIENT_API_KEY", "ZMLUINSToA-aF9moaQM-_gXWh68mrz5Sl99nLH0ZDIlACSnvYdxWSQ")
