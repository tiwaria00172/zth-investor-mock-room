from typing import Optional, Dict, Any
from fastapi import APIRouter, Form, HTTPException
from app.schemas.simulation import SimulationQuestionResponse, SimulationAnswerResponse
from app.services.llm import ask_json
from app.services.prompts import (
    PERSONA_GUIDANCE,
    QUESTION_PROMPT,
    ANSWER_PROMPT
)

router = APIRouter(prefix="/simulation", tags=["Investor Simulation"])

def get_validated_persona(persona_raw: str) -> str:
    key = persona_raw.lower().strip()
    if key not in PERSONA_GUIDANCE:
        valid_options = ", ".join(PERSONA_GUIDANCE.keys())
        raise HTTPException(
            status_code=400,
            detail=f"Invalid persona '{persona_raw}'. Must be one of: {valid_options}"
        )
    return key

@router.post("/question", response_model=SimulationQuestionResponse)
async def generate_simulation_question(
    startup_name: str = Form(...),
    industry: str = Form(...),
    stage: str = Form(...),
    persona: str = Form(...),
    deck_context: Optional[str] = Form("")
):
    """Generates a targeted investor question tailored to startup profile and selected persona."""
    persona_key = get_validated_persona(persona)
    sanitized_context = (deck_context or "").strip()[:14000]

    payload = {
        "profile": {
            "name": startup_name.strip(),
            "industry": industry.strip(),
            "stage": stage.strip()
        },
        "persona": persona_key,
        "persona_guidance": PERSONA_GUIDANCE[persona_key],
        "deck_context": sanitized_context or "No deck evaluation provided. Base question on profile and stage."
    }

    raw = await ask_json(QUESTION_PROMPT, payload, temperature=0.3)
    return SimulationQuestionResponse(
        question=str(raw.get("question", "What is your primary go-to-market advantage?")),
        why_this_persona_asks=str(raw.get("why_this_persona_asks", f"Relevant to {persona_key.replace('_', ' ')} investment thesis.")),
        topic=str(raw.get("topic", "Strategy"))
    )

@router.post("/answer", response_model=SimulationAnswerResponse)
async def assess_simulation_answer(
    question: str = Form(...),
    answer: str = Form(...),
    persona: str = Form(...),
    deck_context: Optional[str] = Form("")
):
    """Critiques the founder's answer with an objective score, strengths, gaps, and coaching notes."""
    persona_key = get_validated_persona(persona)

    cleaned_question = question.strip()
    cleaned_answer = answer.strip()

    if len(cleaned_answer) < 3:
        raise HTTPException(
            status_code=400,
            detail="Answer is too short. Please provide a complete verbal response for evaluation."
        )

    payload = {
        "question": cleaned_question,
        "founder_answer": cleaned_answer,
        "persona": persona_key,
        "persona_guidance": PERSONA_GUIDANCE[persona_key],
        "deck_context": (deck_context or "").strip()[:10000]
    }

    raw = await ask_json(ANSWER_PROMPT, payload, temperature=0.2)

    try:
        score = max(0, min(10, int(raw.get("score", 6))))
    except (ValueError, TypeError):
        score = 6

    strengths = [str(s) for s in raw.get("strengths", []) if s]
    gaps = [str(g) for g in raw.get("gaps", []) if g]

    return SimulationAnswerResponse(
        score=score,
        strengths=strengths if strengths else ["Clear communication"],
        gaps=gaps if gaps else ["Consider providing more concrete metrics"],
        coaching=str(raw.get("coaching", "Keep your opening punchy and lead with validated facts.")),
        example_answer=str(raw.get("example_answer", "Lead with direct metrics and conclude with your strategic rationale.")),
        follow_up_question=str(raw.get("follow_up_question", "How will unit economics scale over the next 12 months?"))
    )
