import httpx
from typing import List, Dict, Any, Optional
from app.config import settings

class HindsightClient:
    """Client for Hindsight Cloud API - managed memory infrastructure."""
    
    def __init__(self):
        self.base_url = "https://api.hindsight.vectorize.io/v1"
        self.api_key = settings.HINDSIGHT_API_KEY
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def create_memory_bank(self, name: str, description: str) -> Dict:
        """Create a memory bank for organizational knowledge."""
        payload = {
            "name": name,
            "description": description,
            "metadata": {
                "type": "organizational_brain",
                "hackathon": "nexus_technologies"
            }
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/memory-banks",
                json=payload,
                headers=self.headers
            )
            return response.json()
    
    async def store_knowledge(self, bank_id: str, content: str, 
                              metadata: Dict[str, Any]) -> Dict:
        """Store organizational knowledge in Hindsight."""
        payload = {
            "content": content,
            "metadata": metadata,
            "importance_score": metadata.get("importance", 0.8)
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/memory-banks/{bank_id}/memories",
                json=payload,
                headers=self.headers
            )
            return response.json()
    
    async def search_memories(self, bank_id: str, query: str, 
                             limit: int = 8) -> List[Dict]:
        """Search organizational memories using Hindsight's retrieval."""
        payload = {
            "query": query,
            "limit": limit,
            "min_relevance": 0.7,
            "include_metadata": True
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/memory-banks/{bank_id}/search",
                json=payload,
                headers=self.headers
            )
            return response.json()
    
    async def update_memory(self, memory_id: str, content: str,
                           metadata: Dict[str, Any]) -> Dict:
        """Update existing memory (for expert corrections)."""
        payload = {
            "content": content,
            "metadata": metadata,
            "version": "latest"
        }
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{self.base_url}/memories/{memory_id}",
                json=payload,
                headers=self.headers
            )
            return response.json()