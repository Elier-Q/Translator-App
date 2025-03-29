import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List

app = FastAPI()


