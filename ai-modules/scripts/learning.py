# ai-modules/scripts/learning.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pymongo
from config import MONGODB_URI

router = APIRouter()

client = pymongo.MongoClient(MONGODB_URI)
db = client["smmplusai"]

@router.get("/courses")
async def get_courses():
    try:
        courses = list(db.courses.find({}, {"_id": 0}))
        return {"courses": courses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))