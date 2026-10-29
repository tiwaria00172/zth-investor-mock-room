from typing import Optional
from fastapi import APIRouter, HTTPException
from app.config import provider_manager
from app.schemas.settings import (
    ProviderSettingsInput,
    TestConnectionInput,
    ProviderSettingsResponse,
    TestConnectionResponse
)
from app.services.llm import ask_json

router = APIRouter(prefix="/settings", tags=["Provider Settings"])

@router.get("/provider", response_model=ProviderSettingsResponse)
async def get_provider_settings():
    """Returns current provider metadata. The API key is masked and never returned."""
    info = provider_manager.get_public_info()
    return ProviderSettingsResponse(
        provider=info["provider"],
        base_url=info["base_url"],
        model=info["model"],
        api_key_configured=info["api_key_configured"],
        saved=True
    )

@router.post("/provider", response_model=ProviderSettingsResponse)
async def save_provider_settings(payload: ProviderSettingsInput):
    """Updates runtime LLM provider configuration in process memory."""
    cleaned_base = payload.base_url.strip().rstrip("/")
    if not cleaned_base.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=400,
            detail="Provider Base URL must start with 'https://' or 'http://'."
        )

    # Validate key requirement if no key previously set
    new_key = payload.api_key.strip()
    if not new_key and not provider_manager.api_key:
        raise HTTPException(
            status_code=400,
            detail="An API key is required to configure the LLM provider."
        )

    provider_manager.update(
        api_key=new_key,
        base_url=cleaned_base,
        model=payload.model.strip(),
        provider=payload.provider
    )

    info = provider_manager.get_public_info()
    return ProviderSettingsResponse(
        provider=info["provider"],
        base_url=info["base_url"],
        model=info["model"],
        api_key_configured=info["api_key_configured"],
        saved=True
    )

@router.post("/provider/test", response_model=TestConnectionResponse)
async def test_provider_settings(payload: Optional[TestConnectionInput] = None):
    """Validates the provider connection by making a live lightweight completion request."""
    test_key = (payload.api_key.strip() if payload and payload.api_key else None) or provider_manager.api_key
    test_base = (payload.base_url.strip().rstrip("/") if payload and payload.base_url else None) or provider_manager.base_url
    test_model = (payload.model.strip() if payload and payload.model else None) or provider_manager.model

    if not test_key:
        raise HTTPException(
            status_code=400,
            detail="Cannot test connection: No API key provided or configured."
        )

    prompt = (
        "You are testing an LLM API connection for ZTH Investor Mock Room. "
        "Return a JSON object with boolean field 'ok' set to true, and string field 'message' set to 'Connection successful'."
    )
    result = await ask_json(
        prompt,
        {"test": True},
        temperature=0.0,
        override_api_key=test_key,
        override_base_url=test_base,
        override_model=test_model
    )

    if result.get("ok") is not True:
        raise HTTPException(
            status_code=502,
            detail="The provider responded, but failed the JSON integrity check. Please try again or test a different model."
        )

    return TestConnectionResponse(
        ok=True,
        message=result.get("message", "Connection verified successfully"),
        model=test_model
    )

@router.get("/provider/models")
async def list_available_models():
    """Lists available models directly from the configured provider endpoint."""
    if not provider_manager.api_key:
        return {"models": []}
    
    endpoint = f"{provider_manager.base_url}/models"
    headers = {
        "Authorization": f"Bearer {provider_manager.api_key}",
        "Content-Type": "application/json"
    }
    try:
        import httpx
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(endpoint, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                models = [m["id"] for m in data.get("data", []) if "id" in m]
                return {"models": sorted(models)}
            return {"error": f"HTTP {resp.status_code}: {resp.text}"}
    except Exception as exc:
        return {"error": str(exc)}
