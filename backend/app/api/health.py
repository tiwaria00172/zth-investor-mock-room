from fastapi import APIRouter
from app.config import settings, provider_manager
from app.schemas.common import HealthResponse

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
async def check_health():
    """Returns application health status and LLM configuration state."""
    return HealthResponse(
        status="ok",
        version=settings.app_version,
        llm_configured=bool(provider_manager.api_key),
        model=provider_manager.model
    )
