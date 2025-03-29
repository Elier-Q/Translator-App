import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(CORSMiddleware , allow_origins=origins , allow_credentials=True , allow_methods=["*"] , allow_headers=["*"])

@app.get("/fruits" , response_model=Fruits)
def get_fruits():
    return Fruits(fruits=memory_db['fruits'])



@app.get("/feed" , response_model=ExpoCamera)
def get_feed():
    return 

