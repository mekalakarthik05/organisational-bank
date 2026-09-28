from typing import List, Dict, Any
from app.services.hindsight_client import HindsightClient
from app.services.llm import llm

class HindsightRAG:
    """RAG pipeline using Hindsight Cloud for memory operations."""
    
    def __init__(self):
        self.hindsight = HindsightClient()
        self.bank_id = settings.HINDSIGHT_BANK_ID
    
    async def ingest_document(self, content: str, metadata: Dict[str, Any]) -> Dict:
        """Store document in Hindsight with organizational context."""
        hindsight_metadata = {
            "title": metadata.get("title", "Untitled"),
            "doc_type": metadata.get("doc_type", "GENERAL"),
            "project": metadata.get("project", ""),
            "department": metadata.get("department", ""),
            "author": metadata.get("author", ""),
            "tags": metadata.get("tags", []),
            "source": "hackathon_upload"
        }
        
        return await self.hindsight.store_knowledge(
            bank_id=self.bank_id,
            content=content,
            metadata=hindsight_metadata
        )
    
    async def answer_question(self, question: str) -> Dict[str, Any]:
        """Answer question using Hindsight's retrieval + Groq LLM."""
        # 1. Search Hindsight for relevant memories
        search_results = await self.hindsight.search_memories(
            bank_id=self.bank_id,
            query=question,
            limit=8
        )
        
        # 2. Build context from retrieved memories
        context = self._build_context(search_results)
        
        # 3. Generate answer with Groq
        system_prompt = """You are the Organizational Brain for Nexus Technologies.
        Answer questions using ONLY the provided organizational context.
        
        Context from organizational memory:
        {context}
        
        If information isn't present, say: "I couldn't find sufficient information 
        in the organization's knowledge base to answer this confidently."
        """
        
        answer = await llm.chat(
            system=system_prompt.format(context=context),
            user=question
        )
        
        # 4. Extract sources
        sources = self._extract_sources(search_results)
        
        return {
            "answer": answer,
            "sources": sources,
            "confidence": self._calculate_confidence(search_results),
            "retrieved_count": len(search_results)
        }
    
    def _build_context(self, memories: List[Dict]) -> str:
        """Build context string from Hindsight memories."""
        context_parts = []
        for i, memory in enumerate(memories, 1):
            metadata = memory.get("metadata", {})
            context_parts.append(
                f"Source {i}: {metadata.get('title', 'Unknown')}\n"
                f"Type: {metadata.get('doc_type', 'GENERAL')}\n"
                f"Content: {memory.get('content', '')}\n"
                f"---"
            )
        return "\n".join(context_parts)