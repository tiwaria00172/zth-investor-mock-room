import pytest
from app.services.llm import extract_json_payload

def test_extract_direct_json():
    raw = '{"key": "value", "score": 90}'
    result = extract_json_payload(raw)
    assert result == {"key": "value", "score": 90}

def test_extract_markdown_json_block():
    raw = """Here is the response:
```json
{
  "startup_summary": "Test company",
  "overall_score": 85
}
```
Hope this helps!"""
    result = extract_json_payload(raw)
    assert result["overall_score"] == 85
    assert result["startup_summary"] == "Test company"

def test_extract_surrounded_braces():
    raw = "Preamble note: {\"test\": 123} trailing note."
    result = extract_json_payload(raw)
    assert result == {"test": 123}

def test_extract_invalid_fails():
    with pytest.raises(ValueError):
        extract_json_payload("This is purely plain text without any json brackets at all.")
