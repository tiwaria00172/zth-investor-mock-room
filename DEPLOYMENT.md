# ZTH Investor Mock Room — Production Cloud Deployment Guide

The application has been unified into a single full-stack web service:
- **FastAPI Backend (Python 3.12)**: Serves AI evaluation, Groq Llama 3.3 diligence engine, and advisor chat at `/api/...`.
- **React 18 Frontend (Vite + TypeScript)**: Built and served directly by FastAPI at `/` (zero CORS issues, single port).

---

## Option 1: 1-Click Free Cloud Deployment on Render.com (Recommended)

Render provides free hosting with automatic SSL (HTTPS) and continuous deployment from GitHub.

### Steps:
1. **Push your code to a GitHub repository:**
   ```bash
   git remote add origin https://github.com/<your-username>/zth-investor-mock-room.git
   git branch -M main
   git push -u origin main
   ```
2. **Deploy on Render:**
   - Log in to [Render.com](https://render.com).
   - Click **New +** -> **Blueprint**.
   - Connect your GitHub repository.
   - Render will automatically detect `render.yaml` and configure the service.
3. **Set your Groq API Key:**
   - In your Render service dashboard under **Environment**, set:
     `GROQ_API_KEY` = `your_groq_api_key_here`
4. **Live URL:**
   Render will deploy your site and give you a live HTTPS URL like:
   `https://zth-investor-mock-room.onrender.com`

---

## Option 2: Deploy on Railway.app

1. Install Railway CLI or visit [Railway.app](https://railway.app).
2. Create a new project from your GitHub repository.
3. Railway automatically detects `Dockerfile`.
4. In Railway project settings, add:
   - `GROQ_API_KEY`: `your_groq_api_key`
5. Click **Deploy** to generate a live `*.up.railway.app` URL.

---

## Option 3: Deploy via Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run in the repository directory:
   ```bash
   fly launch
   fly secrets set GROQ_API_KEY="your_groq_api_key"
   fly deploy
   ```

---

## Option 4: Deploy on Any Linux VPS / Cloud Server (DigitalOcean, AWS, GCP)

1. Clone repository on your server:
   ```bash
   git clone <your-repo-url>
   cd investor-mock-room
   ```
2. Run with Docker Compose:
   ```bash
   docker compose up -d --build
   ```
3. Your application is live at `http://your-server-ip:8000`. Set up Nginx or Caddy with Let's Encrypt for custom domain HTTPS.
