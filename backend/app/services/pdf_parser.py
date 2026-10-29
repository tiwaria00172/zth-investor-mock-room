import re
from typing import List, Dict, Any
import pymupdf as fitz
from fastapi import HTTPException, UploadFile

def sanitize_text(text: str) -> str:
    """Cleans extracted text by stripping control characters and excessive blank lines."""
    if not text:
        return ""
    # Strip null bytes and non-printable control characters except standard whitespace
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    # Collapse multiple consecutive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

async def extract_pdf_slides(file: UploadFile, max_pdf_mb: int) -> List[Dict[str, Any]]:
    """Extracts text content per slide from an uploaded pitch deck PDF.
    
    Validates file format, size, encryption, and readability.
    Returns a list of dictionaries with slide_number, text, and character count.
    """
    filename = file.filename or "deck.pdf"
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file format for '{filename}'. Please upload a PDF pitch deck."
        )

    # Read binary contents
    try:
        raw = await file.read()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Failed to read uploaded file: {str(exc)}") from exc

    if not raw:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    max_bytes = max_pdf_mb * 1024 * 1024
    if len(raw) > max_bytes:
        size_mb = round(len(raw) / (1024 * 1024), 2)
        raise HTTPException(
            status_code=413,
            detail=f"File size ({size_mb} MB) exceeds the allowed limit of {max_pdf_mb} MB."
        )

    try:
        doc = fitz.open(stream=raw, filetype="pdf")
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail="The file could not be parsed as a valid PDF. Please re-export or check for corruption."
        ) from exc

    try:
        if doc.is_encrypted:
            doc.close()
            raise HTTPException(
                status_code=400,
                detail="This PDF is password-protected or encrypted. Please upload an unprotected copy."
            )

        total_pages = len(doc)
        if total_pages == 0:
            doc.close()
            raise HTTPException(status_code=400, detail="The PDF contains 0 pages.")

        slides = []
        for index in range(total_pages):
            page = doc.load_page(index)
            raw_text = page.get_text("text") or ""
            clean_text = sanitize_text(raw_text)
            slides.append({
                "slide_number": index + 1,
                "text": clean_text,
                "char_count": len(clean_text)
            })
    finally:
        if not doc.is_closed:
            doc.close()

    # Validate that selectable text was extracted
    has_text = any(s["char_count"] > 10 for s in slides)
    if not has_text:
        raise HTTPException(
            status_code=422,
            detail="No selectable text was found in this PDF. Scanned or image-only decks require OCR, which is not currently supported. Please export your presentation directly from Keynote, PowerPoint, Google Slides, or Canva as a text-based PDF."
        )

    return slides
