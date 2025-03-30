import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List
import service_test


app = FastAPI()

origins = [
    "http://localhost:3000" #CHANGE THIS TO MATCH THE SERVER
]

app.add_middleware(CORSMiddleware , 
                   allow_origins=origins , 
                   allow_credentials=True , 
                   allow_methods=["*"] , 
                   allow_headers=["*"])

@app.post('/image')
def post_image():
    return service_test.get_image()


if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)

