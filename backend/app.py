import uvicorn
from fastapi import FastAPI , File , UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List
import transapp.backend.service.service as service


app = FastAPI()

origins = [
    "http://127.0.0.1:8000"
]

app.add_middleware(CORSMiddleware , 
                   allow_origins=["*"] , 
                   allow_credentials=True , 
                   allow_methods=["*"] , 
                   allow_headers=["*"])

@app.post('/image')
async def post_image(file: UploadFile = File()):
    return await service.process_image(file)


if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)
