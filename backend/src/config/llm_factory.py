import os
from src.infrastructure.providers.llm.groq_llm_provider import GroqProvider


def get_llm_provider():
    provider = os.getenv("LLM_PROVIDER", "groq")

    if provider == "groq":
        return GroqProvider()

    return GroqProvider()