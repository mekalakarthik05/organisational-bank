import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import ChatRequest, ChatResponse
from app.services.rag import answer_question

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        result = answer_question(
            db, request.message,
            conversation_id=request.conversation_id,
            project_id=request.project_id,
            doc_type=request.doc_type,
            debug=request.debug,
        )
        return ChatResponse(**result)
    except Exception as e:
        logger.exception("Chat pipeline failed")
        raise HTTPException(status_code=500, detail=f"Failed to process chat: {e}")