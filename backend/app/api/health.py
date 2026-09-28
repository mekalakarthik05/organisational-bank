from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Document, DocumentChunk, Feedback, Project

router = APIRouter()


@router.get("/health")
def health(db: Session = Depends(get_db)):
    db_ok, counts = False, {}
    try:
        db.execute(text("SELECT 1"))
        db_ok = True
        counts = {
            "documents": db.query(Document).count(),
            "chunks": db.query(DocumentChunk).count(),
            "projects": db.query(Project).count(),
            "feedback": db.query(Feedback).count(),
        }
    except Exception:
        pass
    return {
        "status": "ok" if db_ok else "degraded",
        "database": db_ok,
        "groq_configured": bool(settings.GROQ_API_KEY),
        "groq_model": settings.GROQ_MODEL,
        "embedding_model": settings.EMBEDDING_MODEL,
        "counts": counts,
    }