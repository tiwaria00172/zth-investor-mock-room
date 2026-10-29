from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_settings_masks_key():
    response = client.get("/api/settings/provider")
    assert response.status_code == 200
    data = response.json()
    assert "api_key" not in data  # Key itself must never be exposed
    assert "api_key_configured" in data
    assert "base_url" in data
    assert "model" in data

def test_save_settings_invalid_url():
    response = client.post(
        "/api/settings/provider",
        json={
            "provider": "OpenAI-Compatible",
            "api_key": "dummy-key",
            "base_url": "ftp://invalid-url.com",
            "model": "test-model"
        }
    )
    assert response.status_code == 400
    assert "Base URL must start with" in response.json()["detail"]

def test_save_settings_success():
    response = client.post(
        "/api/settings/provider",
        json={
            "provider": "OpenAI-Compatible",
            "api_key": "sk-testkey123456",
            "base_url": "https://api.groq.com/openai/v1",
            "model": "llama-3.3-70b-versatile"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_configured"] is True
    assert data["model"] == "llama-3.3-70b-versatile"
    assert "api_key" not in data
