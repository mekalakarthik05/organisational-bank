import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config import settings
from app.database import Base, engine
from app.api import chat, documents, feedback, health, knowledge, projects
from app.api import seed as seed_api

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("organizational-brain")


@asynccontextmanager
async def lifespan(app: FastAPI):
    with engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    Base.metadata.create_all(bind=engine)
    with engine.begin() as conn:
        conn.execute(text(
            "CREATE INDEX IF NOT EXISTS idx_chunks_hnsw ON document_chunks "
            "USING hnsw (embedding vector_cosine_ops)"))
        conn.execute(text(
            "CREATE INDEX IF NOT EXISTS idx_chunks_fts ON document_chunks "
            "USING gin (to_tsvector('english', content))"))
    if settings.SEED_ON_START:
        from seed.seed_data import run_seed
        try:
            result = run_seed()
            logger.info(f"Seed: {result.get('status')} — {result.get('message', '')}")
        except Exception as e:
            logger.error(f"Seeding failed (API still runs): {e}")
    logger.info("✅ Organizational Brain API ready")
    yield


app = FastAPI(title="Organizational Brain API", version="1.0.0", lifespan=lifespan)

origins = ["*"] if settings.ALLOWED_ORIGINS == "*" else settings.ALLOWED_ORIGINS.split(",")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

for r in (health.router, chat.router, documents.router, projects.router,
          knowledge.router, feedback.router, seed_api.router):
    app.include_router(r, prefix="/api")