from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message text content")

class DeckAdvisorRequest(BaseModel):
    message: str = Field(..., description="Founder's question or prompt")
    history: Optional[List[ChatMessage]] = Field(default_factory=list, description="Recent conversation turns")
    deck_context: Optional[str] = Field(default="", description="Extracted slide text or evaluation summary")
    startup_profile: Optional[Dict[str, Any]] = Field(default=None, description="Startup profile details")
    evaluation_summary: Optional[Dict[str, Any]] = Field(default=None, description="Diligence evaluation rubrics and scores")

class DeckAdvisorResponse(BaseModel):
    answer: str = Field(..., description="Executive partner-grade advisory answer")
    what_to_change: List[str] = Field(default_factory=list, description="Specific slides/sections to change with identified gap and fix")
    what_to_keep: List[str] = Field(default_factory=list, description="Compelling elements that should be kept intact")
    how_to_strengthen: List[str] = Field(default_factory=list, description="Concrete proof points and presentation techniques")
    suggested_followups: List[str] = Field(default_factory=list, description="Suggested next questions for the founder")
