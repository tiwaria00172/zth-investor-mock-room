# Multi-stage production Dockerfile for ZTH Investor Mock Room
# Builds React frontend and serves via FastAPI as a unified web application

# --- Stage 1: Build React Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Production Python Backend & Runtime ---
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies for PyMuPDF and runtime healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install backend Python dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy backend application code
COPY backend/ ./backend/

# Copy built frontend assets from Stage 1 into frontend/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Cloud hosts (Render, Railway, Fly.io, Cloud Run) inject $PORT
ENV PORT=8000
EXPOSE 8000

# Set Python path
ENV PYTHONPATH=/app/backend

# Container Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/api/health || exit 1

# Start Uvicorn on 0.0.0.0:$PORT
CMD sh -c "uvicorn app.main:app --app-dir /app/backend --host 0.0.0.0 --port ${PORT:-8000}"
