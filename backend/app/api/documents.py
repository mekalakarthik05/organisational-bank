import hashlib
import os
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Document, DocumentChunk
from app.services.ingestion import (ALLOWED_EXTENSIONS, MAX_FILE_SIZE,
                                    ingest_document)
from app.utils import parse_uuid

router = APIRouter()


@router.post("/documents/upload")
def upload_document(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    doc_type: Optional[str] = Form(None),
    project_name: Optional[str] = Form(None),
    project_id: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),  # comma-separated
    db: Session = Depends(get_db),
):
    filename = file.filename or "upload"
    ext = Path(filename).suffix.lower().lstrip(".")
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, f"Unsupported file type '.{ext}'. Allowed: pdf, docx, txt, md")

    content = file.file.read()
    if not content:
        raise HTTPException(400, "Uploaded file is empty")
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large (max 15 MB)")

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    dest = Path(settings.UPLOAD_DIR) / f"{hashlib.sha256(content).hexdigest()[:16]}_{filename}"
    dest.write_bytes(content)

    tag_list = [t.strip() for t in tags.split(",") if t.strip()] if tags else []
    try:
        result = ingest_document(db, str(dest), filename, title=title, doc_type=doc_type,
                                 project_id=project_id, project_name=project_name,
                                 tags=tag_list)
    except ValueError as e:
        raise HTTPException(422, str(e))

    if result["status"] == "duplicate":
        dest.unlink(missing_ok=True)  # don't keep duplicate copies on disk
    return result


@router.get("/documents")
def list_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    docs = (db.query(Document)
              .order_by(Document.created_at.desc(), Document.title)
              .offset(skip).limit(limit).all())
    return [{
        "id": str(d.id), "title": d.title, "doc_type": d.doc_type,
        "status": d.status, "tags": d.tags or [], "version": d.version,
        "project_id": str(d.project_id) if d.project_id else None,
        "created_at": d.created_at.isoformat(),
        "meta": d.meta or {},
    } for d in docs]


@router.get("/documents/{document_id}")
def get_document(document_id: str, db: Session = Depends(get_db)):
    doc_id = parse_uuid(document_id)
    doc = db.query(Document).filter(Document.id == doc_id).first() if doc_id else None
    if not doc:
        raise HTTPException(404, "Document not found")
    chunks = (db.query(DocumentChunk)
                .filter(DocumentChunk.document_id == doc.id)
                .order_by(DocumentChunk.chunk_index).all())
    return {
        "id": str(doc.id), "title": doc.title, "doc_type": doc.doc_type,
        "status": doc.status, "tags": doc.tags or [], "file_path": doc.file_path,
        "created_at": doc.created_at.isoformat(), "meta": doc.meta or {},
        "chunks": [{"id": str(c.id), "chunk_index": c.chunk_index,
                    "section": c.section, "page_number": c.page_number,
                    "content": c.content} for c in chunks],
    }