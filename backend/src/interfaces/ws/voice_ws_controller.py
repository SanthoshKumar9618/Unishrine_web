import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from src.interfaces.dependencies import get_realtime_orchestrator

router = APIRouter()


@router.websocket("/ws/voice")
async def voice_ws(websocket: WebSocket):

    await websocket.accept()

    orchestrator = get_realtime_orchestrator(websocket)

    task = asyncio.create_task(orchestrator.start())
    

    try:
        await task

    except WebSocketDisconnect:
        print("[WS DISCONNECTED]")

    except Exception as e:
        print("[WS ERROR]:", e)

    finally:
        print("[WS CLEANUP]")

        if not task.done():
            task.cancel()

        try:
            await task
        except asyncio.CancelledError:

            pass

        await orchestrator._shutdown()