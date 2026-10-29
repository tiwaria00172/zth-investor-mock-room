from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str = Field(default="ok", json_schema_extra={"example": "ok"})
    version: str = Field(default="1.0.0", json_schema_extra={"example": "1.0.0"})
    llm_configured: bool = Field(..., description="True if an API key is currently active in backend memory or env")
    model: str = Field(..., description="Active LLM model name")

class ErrorResponse(BaseModel):
    detail: str = Field(..., description="Human-readable error description")
