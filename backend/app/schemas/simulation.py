from typing import List, Optional
from pydantic import BaseModel, Field

class SimulationQuestionRequest(BaseModel):
    startup_name: str = Field(..., max_length=200)
    industry: str = Field(..., max_length=200)
    stage: str = Field(..., max_length=100)
    persona: str = Field(..., pattern="^(?i)(vc|angel|family_office)$", description="Investor persona: vc, angel, or family_office")
    deck_context: Optional[str] = Field(default="", description="Summary or JSON of deck evaluation context")

class SimulationQuestionResponse(BaseModel):
    question: str = Field(..., description="Targeted investor question")
    why_this_persona_asks: str = Field(..., description="Why this specific investor persona focuses on this angle")
    topic: str = Field(..., description="Topic category e.g. Defensibility, Unit Economics, Founder Background")

class SimulationAnswerRequest(BaseModel):
    question: str = Field(..., min_length=5, max_length=2000)
    answer: str = Field(..., min_length=2, max_length=10000)
    persona: str = Field(..., pattern="^(?i)(vc|angel|family_office)$")
    deck_context: Optional[str] = Field(default="")

class SimulationAnswerResponse(BaseModel):
    score: int = Field(..., ge=0, le=10, description="Coaching score for the answer from 0 to 10")
    strengths: List[str] = Field(default_factory=list, description="What the founder communicated effectively")
    gaps: List[str] = Field(default_factory=list, description="Omissions, vague statements, or weak points")
    coaching: str = Field(..., description="Direct coaching feedback on tone, clarity, and credibility")
    example_answer: str = Field(..., description="Model high-impact answer structure")
    follow_up_question: str = Field(..., description="The sharp follow-up question the investor would ask next")
