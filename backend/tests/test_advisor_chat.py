from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_advisor_chat_fallback():
    payload = {
        "message": "What are the fatal flaws in my financial slide?",
        "history": [],
        "deck_context": "Sample Deck with weak financials",
        "startup_profile": {
            "name": "CloudScale AI",
            "industry": "B2B SaaS",
            "stage": "Seed",
            "id": "test-1",
            "timestamp": 1234567890,
            "persona": "vc",
            "question": "",
            "answer": ""
        }
    }
    response = client.post("/api/chat/advisor", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert len(data["answer"]) > 0
    assert "what_to_change" in data
    assert "what_to_keep" in data
    assert "how_to_strengthen" in data
    assert "suggested_followups" in data
    assert isinstance(data["what_to_change"], list)
    assert isinstance(data["what_to_keep"], list)
