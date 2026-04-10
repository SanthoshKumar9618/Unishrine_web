from abc import ABC, abstractmethod
from typing import Optional


class TTSProvider(ABC):

    @abstractmethod
    async def synthesize(
        self,
        text: str,
        language: Optional[str] = "en",
        voice: Optional[str] = None
    ) -> str:
        pass