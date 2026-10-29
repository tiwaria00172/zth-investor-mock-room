from typing import Optional
from pydantic import BaseModel, Field

class ProviderSettingsInput(BaseModel):
    provider: str = Field(default="OpenAI-Compatible", max_length=100)
    api_key: str = Field(default="", max_length=500, description="Leave blank to preserve existing key")
    base_url: str = Field(..., min_length=8, max_length=500, description="Base URL of OpenAI-compatible API endpoint")
    model: str = Field(..., min_length=1, max_length=200, description="Model identifier e.g. llama-3.3-70b-versatile")

class TestConnectionInput(BaseModel):
    provider: Optional[str] = "OpenAI-Compatible"
    api_key: Optional[str] = ""
    base_url: Optional[str] = None
    model: Optional[str] = None

class ProviderSettingsResponse(BaseModel):
    provider: str
    base_url: str
    model: str
    api_key_configured: bool
    saved: bool = True

class TestConnectionResponse(BaseModel):
    ok: bool
    message: str
    model: str
