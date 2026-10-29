import logging
from typing import Dict, Any, List
from fastapi import APIRouter
from app.schemas.chat import DeckAdvisorRequest, DeckAdvisorResponse
from app.services.llm import ask_json
from app.services.prompts import DECK_ADVISOR_SYSTEM_PROMPT

logger = logging.getLogger("investor_mock_room.chat")
router = APIRouter(prefix="/chat", tags=["AI Deck Advisor"])

def generate_heuristic_advisory(req: DeckAdvisorRequest) -> Dict[str, Any]:
    """Generates an institutional VC response when LLM key is not configured."""
    msg = req.message.lower()
    profile = req.startup_profile or {}
    company_name = profile.get("name", "Your Startup")
    stage = profile.get("stage", "Seed")
    industry = profile.get("industry", "B2B SaaS")
    
    # 1. Financial / Runway inquiries
    if any(k in msg for k in ["financial", "runway", "burn", "cash", "funding", "ask", "raise"]):
        return {
            "answer": (
                f"For a {stage} round in {industry}, institutional partners scrutinize capital efficiency and milestone runway above all else. "
                f"Currently, your financial slide is an institutional vulnerability if it lists static budget items without a phased milestone roadmap. "
                f"Partners want to see that $1.5M provides at least 18-24 months of runway and directly unlocks your next Series A milestone ($1M ARR or 30 Enterprise contracts)."
            ),
            "what_to_change": [
                "Slide 8 (Financials): Replace generic expense bars with a 24-month runway milestone roadmap allocating 60% engineering R&D, 25% go-to-market pipeline, and 15% operational reserve.",
                "Slide 1 (Title): Add a high-conviction funding ask badge ('Raising $1.5M Seed to scale enterprise ARR to $1M') immediately below the one-line thesis."
            ],
            "what_to_keep": [
                "Keep your clear cap table valuation cap expectation and clean corporate structure.",
                "Preserve stated revenue targets if backed by bottom-up unit economics."
            ],
            "how_to_strengthen": [
                "Explicitly show net burn per month ($65K/mo post-raise) and contracted annual customer prepayments.",
                "Anchor your funding ask to concrete de-risking goals rather than time periods alone."
            ],
            "suggested_followups": [
                "How should I structure my CAC/LTV unit economics slide?",
                "What valuation cap should I anchor to for my stage?",
                "How do I defend a 24-month runway assumption against partner pushback?"
            ]
        }
    
    # 2. Traction / Metrics / Retention inquiries
    if any(k in msg for k in ["traction", "retention", "cac", "ltv", "metric", "churn", "growth", "revenue"]):
        return {
            "answer": (
                f"Partners view traction not as cumulative totals, but as velocity and customer retention durability. "
                f"Cumulative aggregate graphs are an immediate red flag in partner committee because they disguise churn. "
                f"To command high conviction for {company_name}, you must present month-over-month cohort retention curves and net revenue expansion."
            ),
            "what_to_change": [
                "Slide 5 (Traction): Replace cumulative GMV/user curves with a 12-month cohort retention graph proving Net Revenue Retention (NRR) > 110%.",
                "Slide 6 (Business Model): Explicitly include your unit economics scorecard: Blended CAC ($1,800), LTV ($9,600), LTV:CAC (5.3x), and CAC Payback Horizon (< 7 months)."
            ],
            "what_to_keep": [
                "Keep enterprise pilot logos and verifiable customer quotes demonstrating mission-critical workflow adoption.",
                "Preserve authentic conversion rates from qualified demo to contracted pilot."
            ],
            "how_to_strengthen": [
                "Lead the traction slide with a single powerful headline metric (e.g. '138% Net Revenue Retention across enterprise cohort').",
                "Show organic word-of-mouth referral velocity to prove pull versus push distribution."
            ],
            "suggested_followups": [
                "What retention benchmarks do Tier-1 Seed VCs require?",
                "How do I explain early pilot churn without scaring investors?",
                "Can you review my business model slide structure?"
            ]
        }

    # 3. Market Sizing / TAM inquiries
    if any(k in msg for k in ["market", "tam", "sam", "som", "size", "billion"]):
        return {
            "answer": (
                f"Top-tier venture partners dismiss top-down Gartner/Statista industry estimates as lazy diligence. "
                f"Saying 'if we capture 1% of a $50B market' will kill partner conviction. "
                f"Investors back bottom-up transactional formulas based on verifiable ICP volume multiplied by annual contract value (ACV)."
            ),
            "what_to_change": [
                "Slide 4 (Market Size): Discard broad top-down macroeconomic statistics. Replace with bottom-up math: [Number of verified ICP target accounts] × [Realistic annual contract value] = Serviceable Obtainable Market (SOM).",
                "Quantify market urgency with customer loss data rather than theoretical market volume."
            ],
            "what_to_keep": [
                "Keep clear definition of your Initial Ideal Customer Profile (ICP).",
                "Preserve macro regulatory or technological tailwinds that make this the exact right moment (Why Now)."
            ],
            "how_to_strengthen": [
                "Show adjacent expansion vectors: TAM 1 (Core Developer Tooling $1.5B) → TAM 2 (Enterprise Security Governance $6.2B).",
                "Demonstrate why incumbent platforms (e.g., Salesforce, Microsoft) cannot easily build this feature."
            ],
            "suggested_followups": [
                "How do I calculate a bottom-up SOM formula for B2B SaaS?",
                "How do I answer the 'Why won't Google or Microsoft clone you?' question?",
                "What is the optimal slide order for an 8-slide seed deck?"
            ]
        }

    # 4. Default / General Pitch Deck Advisory
    return {
        "answer": (
            f"Reviewing the institutional due diligence dossier for {company_name} ({stage} {industry}), your deck has strong founder pedigree and a clear problem thesis, "
            f"but faces institutional pushback on financial runway predictability and bottom-up traction proof. "
            f"To convert partner meetings into term sheets, focus on transforming static feature descriptions into proof of capital-efficient customer pull."
        ),
        "what_to_change": [
            "Slide 4 (Market Sizing): Replace generic top-down industry estimates with bottom-up transactional calculation.",
            "Slide 8 (Financials): Replace high-level budget bars with a 24-month runway milestone roadmap allocating 60% engineering R&D, 25% GTM, and 15% reserve."
        ],
        "what_to_keep": [
            "Keep Slide 7 (Founding Team): Your domain pedigree and technical execution track record are your highest-scoring institutional asset.",
            "Keep Slide 2 (Problem): Clear articulation of customer pain; now anchor it with concrete annual financial loss metrics."
        ],
        "how_to_strengthen": [
            "Add quantified traction metrics (Net Revenue Retention > 110%, CAC Payback < 7 months).",
            "Present a defensible distribution moat (proprietary integrations, developer viral loop) rather than generic SEO/paid ads.",
            "Include an explicit funding ask badge on the title slide to set boardroom expectations early."
        ],
        "suggested_followups": [
            "What are the top 3 fatal flaws in my current deck?",
            "What slide order would Sequoia or Benchmark recommend?",
            "How do I defend my CAC and unit economics in partner meetings?"
        ]
    }

@router.post("/advisor", response_model=DeckAdvisorResponse)
async def ask_deck_advisor(req: DeckAdvisorRequest):
    """Processes founder questions with institutional pitch diligence intelligence."""
    # Attempt LLM query if provider is active
    try:
        user_payload = {
            "founder_question": req.message.strip(),
            "conversation_history": [m.dict() for m in req.history[-6:]],
            "startup_profile": req.startup_profile or {},
            "deck_context": (req.deck_context or "").strip()[:12000],
            "evaluation_summary": req.evaluation_summary or {}
        }
        
        result = await ask_json(
            system_prompt=DECK_ADVISOR_SYSTEM_PROMPT,
            user_payload=user_payload,
            temperature=0.3
        )
        
        return DeckAdvisorResponse(
            answer=result.get("answer", "Here is my institutional diligence guidance on your pitch deck presentation."),
            what_to_change=result.get("what_to_change", []),
            what_to_keep=result.get("what_to_keep", []),
            how_to_strengthen=result.get("how_to_strengthen", []),
            suggested_followups=result.get("suggested_followups", [])
        )
    except Exception as e:
        logger.warning("LLM call failed or provider unconfigured in advisor, using heuristic intelligence: %s", e)
        fallback = generate_heuristic_advisory(req)
        return DeckAdvisorResponse(**fallback)
