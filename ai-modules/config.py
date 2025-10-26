# ai-modules/config.py

import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/smmplusai")
AI_API_KEY = os.getenv("AI_API_KEY", "your_ai_api_key_here")