from dataclasses import dataclass
from typing import AsyncGenerator, Protocol
from abc import ABC, abstractmethod



@dataclass
class STTResult:
    is_final: bool
    text: str



class STTProvider(Protocol):
    async def stream(self, audio_chunk: bytes) -> AsyncGenerator[STTResult, None]:
        ...



class StreamingSTTProvider(ABC):

    @abstractmethod
    async def start(self) -> None:
        """Initialize streaming session"""

    @abstractmethod
    async def send_audio(self, chunk: bytes) -> None:
        """Send audio chunk to STT engine"""

    @abstractmethod
    async def receive_transcript(self) -> str | None:
        """Receive partial or final transcript"""

    @abstractmethod
    async def close(self) -> None:
        """Close streaming session"""