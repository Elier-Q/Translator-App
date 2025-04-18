import uvicorn
from fastapi import FastAPI , File , UploadFile, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Base64Bytes
from typing import List
import serviceimpl.service as service
from starlette.websockets import WebSocket
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import logging

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
]
app.add_middleware(CORSMiddleware , 
                   allow_origins=origins , 
                   allow_credentials=True , 
                   allow_methods=["*"] , 
                   allow_headers=["*"])


class ImageRequest(BaseModel):
    uri: str

@app.post('/image-uri')
async def post_image_uri(request: ImageRequest):
    return await service.process_image_uri(uri=request.uri)

@app.post('/image-file')
async def post_image_file(file: UploadFile = File(...)):
    try:
        logging.info(f"Received file: {file.filename}")  # Log the filename of the uploaded file
        text = await service.process_image_file(file)
        logging.info(f"Extracted text: {text}")  # Log the extracted text (for debugging purposes)
        return JSONResponse(content={"text": text})
    except Exception as e:
        logging.error(f"Error processing the image: {e}")
        raise HTTPException(status_code=500, detail="Error processing the image")


@app.websocket('/ws')
async def post_feed(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            frame = await websocket.receive_bytes()
            text = await service.process_feed(frame)
            await websocket.send_text(text)
            
    except WebSocketDisconnect:
        print("Disconnect")

@app.get('/langcode')
def get_langcode(language: str):
    return service.langcode(language)
@app.post('/translate')
async def post_translation(original_text: str , target_language: str):
    target_lang_code = service.langcode(target_language)
    return service.translate(original_text , target_lang_code)

if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)
