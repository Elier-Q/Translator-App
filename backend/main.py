import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List

app = FastAPI()

origins = [
    "http://localhost:3000" #CHANGE THIS TO MATCH THE SERVER
]

app.add_middleware(CORSMiddleware , 
                   allow_origins=origins , 
                   allow_credentials=True , 
                   allow_methods=["*"] , 
                   allow_headers=["*"])


@app.get('/feed') #RETURN SOMETHING
def get_feed():
    return None 


@app.get("/feed" , response_model=ExpoCamera)
def get_feed():
    return None


if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)

