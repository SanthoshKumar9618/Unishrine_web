from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

from src.config.settings import settings


class RAGService:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

        self.model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

        self.top_k = 5

    def generate_embedding(self, text: str):
        return self.model.encode(text).tolist()

    def retrieve_context(self, query: str) -> str:
        query_embedding = self.generate_embedding(query)

        response = self.supabase.rpc(
            "match_documents",
            {
                "query_embedding": query_embedding,
                "match_count": self.top_k
            }
        ).execute()

        results = response.data or []

        if not results:
            return ""

        context = "\n\n".join([
            item["content"]
            for item in results
        ])

        return context