from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_simulation_question_invalid_persona():
    response = client.post(
        "/api/simulation/question",
        data={
            "startup_name": "Acme Inc",
            "industry": "Fintech",
            "stage": "Seed",
            "persona": "invalid_persona",
            "deck_context": "Some context"
        }
    )
    assert response.status_code == 400
    assert "Invalid persona" in response.json()["detail"]

def test_simulation_answer_empty():
    response = client.post(
        "/api/simulation/answer",
        data={
            "question": "What is your CAC payback period?",
            "answer": " ",
            "persona": "vc",
            "deck_context": ""
        }
    )
    assert response.status_code == 400
    assert "Answer is too short" in response.json()["detail"]
