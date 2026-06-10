from dotenv import load_dotenv

from src.config.settings import settings
load_dotenv()


from fastapi import FastAPI
from sqlalchemy import text
from src.infrastructure.db.base import Base
from src.infrastructure.db import models
from fastapi.middleware.cors import CORSMiddleware
import os

from src.interfaces.ws.voice_ws_controller import (
    router as ws_router
)


# DB
from src.infrastructure.db.session import engine

# ROUTERS
from src.interfaces.api.v1.lead_router import (
    router as lead_router
)


# METRICS
from prometheus_client import make_asgi_app

app = FastAPI(
    title="Zeva Voice Demo Engine",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",


        "https://unishrine.com",
        "https://www.unishrine.com",
        "https://unishrineweb-production-b31d.up.railway.app",

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# PROMETHEUS METRICS
# -----------------------------
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)


# -----------------------------
# ROUTES
# -----------------------------
app.include_router(ws_router)

app.include_router(
    lead_router,
    prefix="/api/v1",
    tags=["Leads"]
)


AUDIO_DIR = "storage/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

# -----------------------------
# STARTUP
# -----------------------------
@app.on_event("startup")
async def create_tables():

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/db")
async def health_db():

    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))


    return {"status": "db ok"}