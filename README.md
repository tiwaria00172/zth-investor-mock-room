# ZTH Investor Mock Room — Production Architecture

A high-performance pitch-deck readiness and investor simulation platform tailored for startup founders. Built with the **ZTH Export Finance** design system (Inter, Playfair Display, ZTH navy `#1b347a`, cobalt `#1b53dc`, and high-contrast large fonts for readability).

---

## Key Features

1. **Pitch Deck Evaluation**:
   - Parses multi-page PDF presentations with slide-by-slide text extraction using PyMuPDF.
   - Evaluates decks against 10 critical investment dimensions (Problem, Solution, TAM/SAM/SOM, Business Model, Traction, GTM, Moat, Financials, Team, and The Ask).
   - Generates objective readiness scores (0-100), itemized rubric cards with animated progress bars, prioritized diligence fixes, and slide-level evidence citations.
   - **One-Click Export**: Founders can download an assessment report as a formatted Markdown file (`.md`) or copy it to the clipboard.

2. **Investor Pitch Simulation**:
   - Three distinct investor personas:
     - **Venture Capital**: Power-law scale, defensibility, unit economics, and 100x return potential.
     - **Angel Investor**: Founder obsession, early customer intimacy, capital efficiency, and 6-month milestones.
     - **Family Office**: Capital preservation, downside risk, governance, sustainable margins, and long-term cash flow.
   - Realistic verbal answer critique with strengths, gaps, coaching notes, model answer structure, and sharp investor follow-ups.

3. **Enterprise Security & Key Handling**:
   - API keys are held strictly in process memory on the backend and never persisted to disk or sent back to the browser.
   - Guarded system prompts isolate untrusted deck text to prevent prompt injection.

4. **Session Persistence**:
   - Browser `localStorage` maintains startup profile, evaluation results, and practice responses across page reloads.

---

## Directory Architecture

```
investor-mock-room/
├── README.md                           # Documentation
├── backend/
│   ├── .env.example                    # Environment configuration template
│   ├── pytest.ini                      # Pytest runner configuration
│   ├── requirements.txt                # Production and test dependencies
│   ├── create_sample_deck.py           # Sample pitch deck generator
│   ├── sample_pitch_deck.pdf           # Ready-to-test sample deck
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI app with security middleware & error handlers
│   │   ├── config.py                   # Pydantic settings & in-memory key manager
│   │   ├── api/                        # Modular API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── router.py               # Aggregated API router (/api)
│   │   │   ├── health.py               # Health & version check
│   │   │   ├── settings.py             # Masked provider credentials & live connection test
│   │   │   ├── evaluation.py           # Deck parsing & rubric scoring
│   │   │   └── simulation.py           # Persona-based question generation & answer critique
│   │   ├── schemas/                    # Pydantic validation & response models
│   │   │   ├── common.py
│   │   │   ├── settings.py
│   │   │   ├── evaluation.py
│   │   │   └── simulation.py
│   │   └── services/                   # Business logic & LLM services
│   │       ├── llm.py                  # Resilient LLM client with retries & JSON extraction
│   │       ├── pdf_parser.py           # Sanitized PyMuPDF slide extraction
│   │       └── prompts.py              # System prompts & persona guidelines
│   └── tests/                          # Automated backend test suite
│       ├── conftest.py
│       ├── test_health.py
│       ├── test_settings.py
│       ├── test_pdf_parser.py
│       ├── test_llm_json_extractor.py
│       └── test_simulation.py
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts                  # Vite config (dev port: 5174, proxy to 8000)
    └── src/
        ├── main.tsx
        ├── App.tsx                     # Top-level application coordinator & step router
        ├── styles.css                  # ZTH design system, gliding animations & responsive layout
        ├── vite-env.d.ts               # Vite TypeScript declarations
        ├── types/                      # TypeScript domain interfaces
        │   └── index.ts
        ├── services/                   # Typed API service client (port 8000)
        │   └── api.ts
        ├── hooks/                      # Custom hooks
        │   ├── useAnimatedCounter.ts   # Count-up score animation hook
        │   └── useLocalStorage.ts      # Reactive browser persistence hook
        ├── utils/                      # Report export & sample data
        │   ├── exportReport.ts         # Markdown report generator & clipboard export
        │   └── sampleData.ts           # Interactive demo sample deck & evaluation
        ├── pages/                      # Antigravity-inspired step pages
        │   ├── DashboardPage.tsx       # Screen 1: Pitch upload & startup context
        │   ├── EvaluationReportPage.tsx# Screen 2: 10-category rubric & diligence report
        │   └── InvestorPracticePage.tsx# Screen 3: Multi-persona simulation workspace
        └── components/
            ├── ProviderSettingsModal.tsx# AI Provider configuration dialog
            └── imr/                    # Modular ZTH workspace UI components
                ├── AppHeader.tsx       # Top navbar with breadcrumbs & settings trigger
                ├── AppSidebar.tsx      # Collapsible dark navy sidebar with active pill glider
                ├── WorkflowStepper.tsx # 3-step fluid gliding workflow indicator
                ├── UploadDropzone.tsx  # Drag & drop PDF uploader with animated states
                ├── StartupContextForm.tsx # Primary & expandable startup details form
                ├── StagedLoadingIndicator.tsx # Staged real analysis progress bar
                ├── ReadinessScore.tsx  # SVG circular progress meter with count-up score
                ├── CategoryScoreCard.tsx # Expandable rubric card with score breakdown
                ├── EvidencePanel.tsx   # Slide citations with text vs visual badges
                ├── PriorityActionList.tsx # Interactive diligence fixes checklist
                ├── InvestorPersonaPicker.tsx # VC / Angel / Family Office selector
                └── ConversationPanel.tsx # 2-column Q&A practice stream with typing indicators
```

---

## Quickstart Guide

### 1. Backend Setup & Run

In PowerShell / Terminal:
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

To run the backend server:
```powershell
uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger API Documentation: `http://127.0.0.1:8000/docs`
- Health Endpoint: `http://127.0.0.1:8000/api/health`

To run the automated backend test suite:
```powershell
pytest -v
```

To generate a sample 8-slide pitch deck for immediate testing:
```powershell
python create_sample_deck.py
```

### 2. Frontend Setup & Run

In a separate terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5174` in your browser.

To verify a production build:
```powershell
npm run build
```

---

## AI Provider Configuration

1. Open the application and click **AI Provider** in the top navigation bar.
2. Select **OpenAI-Compatible** provider.
3. Paste your API key (e.g., from [Groq Console](https://console.groq.com)).
4. Default Base URL: `https://api.groq.com/openai/v1`
5. Default Model: `llama-3.3-70b-versatile` (or any available model on your account).
6. Click **Save provider settings**, then **Test connection**.
