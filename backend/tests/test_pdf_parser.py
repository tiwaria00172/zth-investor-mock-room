import io
import pytest
import pymupdf as fitz
from fastapi import UploadFile
from app.services.pdf_parser import extract_pdf_slides, sanitize_text

def test_sanitize_text():
    raw = "Hello\x00 world!\n\n\n\nMultiple lines."
    cleaned = sanitize_text(raw)
    assert "\x00" not in cleaned
    assert "Hello world!" in cleaned
    assert "\n\n\n" not in cleaned

@pytest.mark.asyncio
async def test_extract_invalid_extension():
    file = UploadFile(filename="deck.txt", file=io.BytesIO(b"not a pdf"))
    with pytest.raises(Exception) as exc:
        await extract_pdf_slides(file, max_pdf_mb=15)
    assert "Invalid file format" in str(exc.value.detail)

@pytest.mark.asyncio
async def test_extract_empty_file():
    file = UploadFile(filename="deck.pdf", file=io.BytesIO(b""))
    with pytest.raises(Exception) as exc:
        await extract_pdf_slides(file, max_pdf_mb=15)
    assert "uploaded file is empty" in str(exc.value.detail)

@pytest.mark.asyncio
async def test_extract_valid_pdf():
    # Create an in-memory PDF with 2 slides using PyMuPDF
    doc = fitz.open()
    page1 = doc.new_page()
    page1.insert_text((50, 72), "Slide 1: Problem Statement - High Churn in SMB SaaS")
    page2 = doc.new_page()
    page2.insert_text((50, 72), "Slide 2: Solution - Predictive Customer Success AI")
    pdf_bytes = doc.tobytes()
    doc.close()

    file = UploadFile(filename="sample_pitch.pdf", file=io.BytesIO(pdf_bytes))
    slides = await extract_pdf_slides(file, max_pdf_mb=15)

    assert len(slides) == 2
    assert slides[0]["slide_number"] == 1
    assert "Problem Statement" in slides[0]["text"]
    assert slides[1]["slide_number"] == 2
    assert "Predictive Customer Success" in slides[1]["text"]
