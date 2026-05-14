from sentence_transformers import SentenceTransformer
from supabase import create_client, Client
from uuid import uuid4
import os

from src.config.settings import settings


class RAGIngestionService:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

        self.model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

    def chunk_text(
        self,
        text: str,
        chunk_size: int = 500,
        overlap: int = 100
    ):
        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start += chunk_size - overlap

        return chunks

    def generate_embedding(self, text: str):
        return self.model.encode(text).tolist()

    def store_chunk(
        self,
        content: str,
        metadata: dict,
        embedding: list
    ):
        response = self.supabase.table(
            "knowledge_base"
        ).insert({
            "id": str(uuid4()),
            "content": content,
            "metadata": metadata,
            "embedding": embedding
        }).execute()

        return response

    def ingest_text(
        self,
        raw_text: str,
        source_name: str = "manual_upload"
    ):
        chunks = self.chunk_text(raw_text)

        for chunk in chunks:
            embedding = self.generate_embedding(chunk)

            self.store_chunk(
                content=chunk,
                metadata={
                    "source": source_name
                },
                embedding=embedding
            )

        return {
            "status": "success",
            "message": f"{len(chunks)} chunks stored"
        }