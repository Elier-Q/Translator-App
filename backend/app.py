import uvicorn
from fastapi import FastAPI , File , UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List
import serviceimpl.service as service
#from websocket import WebSocket
import requests


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

'''
@app.websocket('/ws')
async def post_feed(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            frame = await websocket.recv()
            text = service.process_feed(frame)
            await websocket.send_text(text)
            
    except websocket.close:
        print("Disconnect")
'''

@app.get('/langcode')
def get_langcode(language: str):
    return service.langcode(language)
@app.post('/translate')
async def post_translation(original_text: str , target_lang_code: str):
    return service.translate(original_text , target_lang_code)

if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)
