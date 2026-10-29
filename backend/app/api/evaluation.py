import logging
from typing import Dict, Any
from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from app.config import settings
from app.schemas.evaluation import EvaluationResponse
from app.services.pdf_parser import extract_pdf_slides
from app.services.llm import ask_json
from app.services.prompts import EVALUATION_PROMPT, prepare_deck_context

logger = logging.getLogger("investor_mock_room.evaluation")
router = APIRouter(tags=["Evaluation"])

def normalize_evaluation_result(result: Dict[str, Any], total_slides: int) -> Dict[str, Any]:
    """Ensures evaluation output contains required fields with valid types and fallbacks."""
    # Ensure overall score is an integer within 0-100
    try:
        score = int(result.get("overall_score", 65))
        overall_score = max(0, min(100, score))
    except (ValueError, TypeError):
        overall_score = 65

    categories = []
    for cat in result.get("categories", []):
        if not isinstance(cat, dict):
            continue
        try:
            cat_score = max(0, min(10, int(cat.get("score", 5))))
        except (ValueError, TypeError):
            cat_score = 5
        categories.append({
            "name": str(cat.get("name", "Category")),
            "score": cat_score,
            "reason": str(cat.get("reason", "No evaluation details provided.")),
            "slide_numbers": [int(n) for n in cat.get("slide_numbers", []) if str(n).isdigit()]
        })

    improvements = []
    for imp in result.get("improvements", []):
        if not isinstance(imp, dict):
            continue
        priority = str(imp.get("priority", "Medium")).capitalize()
        if priority not in ("High", "Medium", "Low"):
            priority = "Medium"
        improvements.append({
            "priority": priority,
            "issue": str(imp.get("issue", "Identified issue")),
            "why_it_matters": str(imp.get("why_it_matters", "Critical to investor assessment")),
            "recommendation": str(imp.get("recommendation", "Review and clarify")),
            "slide_numbers": [int(n) for n in imp.get("slide_numbers", []) if str(n).isdigit()]
        })

    strengths = []
    for s in result.get("strengths", []):
        if isinstance(s, dict):
            strengths.append({
                "point": str(s.get("point", "")),
                "slide_numbers": [int(n) for n in s.get("slide_numbers", []) if str(n).isdigit()]
            })
        elif isinstance(s, str):
            strengths.append({"point": s, "slide_numbers": []})

    missing_info = [str(x) for x in result.get("missing_information", []) if x]
    limitations = [str(x) for x in result.get("limitations", []) if x]
    if not limitations:
        limitations = [
            "Coaching assessment based exclusively on extracted text content.",
            "Visual hierarchy and slide aesthetics require manual review."
        ]

    return {
        "startup_summary": str(result.get("startup_summary", "Startup Pitch Deck Analysis")),
        "overall_score": overall_score,
        "score_note": str(result.get("score_note", "Assessment generated from deck review.")),
        "categories": categories,
        "strengths": strengths,
        "improvements": improvements,
        "missing_information": missing_info,
        "limitations": limitations,
        "slides_extracted": total_slides
    }

@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_deck(
    file: UploadFile = File(...),
    startup_name: str = Form("Startup"),
    industry: str = Form("Not specified"),
    stage: str = Form("Not specified")
):
    """Evaluates an uploaded pitch deck PDF against standard investor readiness rubrics."""
    slides = await extract_pdf_slides(file, settings.max_pdf_mb)
    total_slides = len(slides)

    # Format slides for LLM context with length controls
    slides_context = [
        {"slide_number": s["slide_number"], "text": s["text"][:3500]}
        for s in slides
    ]

    user_payload = {
        "startup_profile": {
            "name": startup_name.strip() or "Startup",
            "industry": industry.strip() or "Not specified",
            "fundraising_stage": stage.strip() or "Not specified"
        },
        "total_slides": total_slides,
        "slides": slides_context
    }

    raw_result = await ask_json(EVALUATION_PROMPT, user_payload, temperature=0.2)
    normalized = normalize_evaluation_result(raw_result, total_slides)

    return EvaluationResponse(**normalized)
