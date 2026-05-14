from abc import ABC, abstractmethod
from typing import AsyncGenerator, List, Dict, Any


class LLMProvider(ABC):
    """
    Base interface for all LLM providers.

    Implementations:
    - OpenAI
    - Anthropic
    - Local LLM
    - Mock provider
    """

    @abstractmethod
    async def stream_generate(
        self,
        messages: List[Dict[str, Any]],
        config: Dict[str, Any],
    ) -> AsyncGenerator[str, None]:
        """
        Stream tokens from the LLM.
        """
        pass

    async def parse_tool_call(self, text: str):
        """
        Optional tool call parsing.
        """
        return None