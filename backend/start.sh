#!/bin/bash

# Install dependencies
pip install -r requirements-railway.txt

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port $PORT
