# ai-modules/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from scripts.strategy import router as strategy_router
from scripts.content_gen import router as content_router
from scripts.analytics import router as analytics_router
from scripts.learning import router as learning_router

app = FastAPI(title="SMM+AI Modules")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(strategy_router, prefix="/strategy")
app.include_router(content_router, prefix="/content")
app.include_router(analytics_router, prefix="/analytics")
app.include_router(learning_router, prefix="/learning")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)