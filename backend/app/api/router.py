from fastapi import APIRouter
from app.api.health import router as health_router
from app.api.settings import router as settings_router
from app.api.evaluation import router as evaluation_router
from app.api.simulation import router as simulation_router
from app.api.chat import router as chat_router

api_router = APIRouter(prefix="/api")

api_router.include_router(health_router)
api_router.include_router(settings_router)
api_router.include_router(evaluation_router)
api_router.include_router(simulation_router)
api_router.include_router(chat_router)
