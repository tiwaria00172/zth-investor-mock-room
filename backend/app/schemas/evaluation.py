from typing import List, Optional
from pydantic import BaseModel, Field

class CategoryScore(BaseModel):
    name: str = Field(..., description="Rubric category name e.g. problem, solution, market, etc.")
    score: int = Field(..., ge=0, le=10, description="Category readiness score from 0 to 10")
    reason: str = Field(..., description="Explanation of the score and gap identified based on deck evidence")
    solution: Optional[str] = Field(None, description="Actionable recommendation and solution to resolve this gap and satisfy investor scrutiny")
    slide_numbers: List[int] = Field(default_factory=list, description="Relevant slide numbers cited")

class Strength(BaseModel):
    point: str = Field(..., description="Key deck strength identified")
    slide_numbers: List[int] = Field(default_factory=list, description="Slide numbers where strength is evidenced")

class Improvement(BaseModel):
    priority: str = Field(..., description="Priority: High, Medium, or Low")
    issue: str = Field(..., description="Identified gap or weakness")
    why_it_matters: str = Field(..., description="Why investors care about this gap")
    recommendation: str = Field(..., description="Actionable recommendation to fix or clarify")
    slide_numbers: List[int] = Field(default_factory=list, description="Relevant slide numbers")

class EvaluationResponse(BaseModel):
    startup_summary: str = Field(..., description="Concise synopsis of the business based on deck")
    overall_score: int = Field(..., ge=0, le=100, description="Readiness score out of 100")
    score_note: str = Field(..., description="High-level note clarifying assessment basis")
    categories: List[CategoryScore] = Field(default_factory=list, description="Category breakdowns")
    strengths: List[Strength] = Field(default_factory=list, description="Identified strengths")
    improvements: List[Improvement] = Field(default_factory=list, description="Prioritized improvements")
    missing_information: List[str] = Field(default_factory=list, description="Information missing from deck")
    limitations: List[str] = Field(default_factory=list, description="Limitations of this automated coaching review")
    slides_extracted: int = Field(..., description="Number of slides extracted from the PDF")
