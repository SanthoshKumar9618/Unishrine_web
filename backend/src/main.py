from dotenv import load_dotenv

from src.config.settings import settings
<<<<<<< HEAD
load_dotenv()
=======
load_dotenv()   # 🔥 MUST BE FIRST
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

from fastapi import FastAPI
from sqlalchemy import text
from src.infrastructure.db.base import Base
from src.infrastructure.db import models
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< HEAD

from src.interfaces.ws.voice_ws_controller import (
    router as ws_router
)
=======
from src.interfaces.ws.voice_ws_controller import router as ws_router
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

# DB
from src.infrastructure.db.session import engine

# ROUTERS
<<<<<<< HEAD
from src.interfaces.api.v1.lead_router import (
    router as lead_router
)
=======
from src.interfaces.api.v1.lead_router import router as lead_router
from src.interfaces.api.v1.voice_router import router as voice_router
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

# METRICS
from prometheus_client import make_asgi_app

app = FastAPI(
    title="Zeva Voice Demo Engine",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
<<<<<<< HEAD
        "http://localhost:3000",
        "http://localhost:3001",
=======
       # "http://localhost:3000",
       # "http://localhost:3001",
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

        "https://unishrine.com",
        "https://www.unishrine.com",

        "https://unishrineweb-production.up.railway.app",
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

<<<<<<< HEAD
=======

>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
# -----------------------------
# ROUTES
# -----------------------------
app.include_router(ws_router)
<<<<<<< HEAD

app.include_router(
    lead_router,
    prefix="/api/v1",
    tags=["Leads"]
)
=======
app.include_router(lead_router, prefix="/api/v1", tags=["Leads"])
app.include_router(voice_router, prefix="/api/v1", tags=["Voice"])
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

AUDIO_DIR = "storage/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

# -----------------------------
<<<<<<< HEAD
# STARTUP
# -----------------------------
@app.on_event("startup")
async def create_tables():

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

=======

@app.on_event("startup")
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/db")
async def health_db():
<<<<<<< HEAD

    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))

=======
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    return {"status": "db ok"}