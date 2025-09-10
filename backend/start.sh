#!/bin/bash

# Set default port if PORT is not set
export PORT=${PORT:-8000}

# Start the application
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT