# tests/ai/strategy.test.py

import pytest
from fastapi.testclient import TestClient
from ai-modules.main import app

client = TestClient(app)

def test_generate_strategy():
    response = client.post("/strategy/generate", json={"user_id": "test_user"})
    assert response.status_code == 200
    assert "contentPlan" in response.json()