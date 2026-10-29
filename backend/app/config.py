from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "ZTH Investor Mock Room API"
    app_version: str = "1.0.0"
    openai_api_key: str = Field(default="", description="Default LLM API key")
    openai_model: str = Field(default="llama-3.3-70b-versatile", description="Default model identifier")
    openai_base_url: str = Field(default="https://api.groq.com/openai/v1", description="Default OpenAI-compatible API base URL")
    frontend_origins: Union[str, List[str]] = Field(
        default=[
            "http://localhost:5174",
            "http://127.0.0.1:5174",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:8000",
            "http://127.0.0.1:8000"
        ],
        description="Allowed CORS origins"
    )
    max_pdf_mb: int = Field(default=15, description="Maximum PDF upload size in megabytes")
    request_timeout_seconds: float = Field(default=90.0, description="HTTP timeout for LLM provider requests")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False
    )

    @field_validator("frontend_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if "," in v:
                return [origin.strip() for origin in v.split(",") if origin.strip()]
            return [v.strip()]
        return list(v)

settings = Settings()

class ProviderConfigManager:
    """Manages active LLM provider settings at runtime in memory.
    
    Credentials stay strictly in process memory and are never persisted to disk
    or transmitted back to the browser.
    """
    def __init__(self, default_settings: Settings):
        self._provider = "OpenAI-Compatible"
        self._api_key = default_settings.openai_api_key
        self._base_url = default_settings.openai_base_url.rstrip("/")
        self._model = default_settings.openai_model

    def update(self, *, api_key: str, base_url: str, model: str, provider: str = "OpenAI-Compatible") -> None:
        self._provider = provider.strip()
        cleaned_key = api_key.strip()
        if cleaned_key:
            self._api_key = cleaned_key
        self._base_url = base_url.strip().rstrip("/")
        self._model = model.strip()

    def get_public_info(self) -> dict:
        return {
            "provider": self._provider,
            "base_url": self._base_url,
            "model": self._model,
            "api_key_configured": bool(self._api_key),
        }

    @property
    def api_key(self) -> str:
        return self._api_key

    @property
    def base_url(self) -> str:
        return self._base_url

    @property
    def model(self) -> str:
        return self._model

    @property
    def provider(self) -> str:
        return self._provider

# Singleton manager initialized with settings
provider_manager = ProviderConfigManager(settings)

# Backward compatibility alias
provider_config = provider_manager.get_public_info()
def update_provider_config(*, api_key: str, base_url: str, model: str, provider: str = "OpenAI-Compatible") -> None:
    provider_manager.update(api_key=api_key, base_url=base_url, model=model, provider=provider)
