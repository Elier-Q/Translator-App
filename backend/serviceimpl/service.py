import numpy as np
import cv2
import pytesseract
from PIL import Image
from fastapi import File , UploadFile
import io
import deepl
import requests
import aiofiles
import os

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

UPLOAD_FOLDER = "uploads"  # Define the folder where files will be stored

async def process_image(file: UploadFile = File()):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the upload folder exists
    
    # Define the file path
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Read the file asynchronously
    content = b""
    async with aiofiles.open(file_path, "wb") as out_file:  # Open the file in binary write mode
        while chunk := await file.read(1024):  # Read in chunks
            content += chunk

    # Process the image
    try:
        # Open image from byte content and convert it to numpy array
        image = np.array(Image.open(io.BytesIO(content)))
        
        # Check the number of channels in the image
        if len(image.shape) == 3:  # 3 channels for a color image (RGB/BGR)
            gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
        else:
            gray_frame = image  # If it's already grayscale, just use it

        # Use pytesseract to extract text
        text = pytesseract.image_to_string(gray_frame)
        return text
    except Exception as e:
        # Handle errors that might occur during image processing
        print(f"Error processing the image: {e}")
        return "Error processing the image"

async def process_feed(image_bytes: bytes):

    image = np.array(Image.open(io.BytesIO(image_bytes)))

    gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray_frame)

    return text

def langcode(lang: str):

    url = 'https://api-free.deepl.com/v2/languages'
    headers = {"Authorization": "DeepL-Auth-Key 86cead83-acdf-4c04-b299-47afe2d50034:fx"}  # Correct API key format

    response = requests.get(url, headers=headers)

    try:
        response = requests.get(url , headers=headers)
        response.raise_for_status()

        languages = response.json()

        for l in languages:
            if l.get('name','').lower() == lang.lower():
                return l.get('language')
    except requests.exceptions.RequestException as e:
        print(e)

    return None
async def translate(text: str , target: str):
    
    translator = deepl.Translator('86cead83-acdf-4c04-b299-47afe2d50034:fx')

    return await translator.translate_text(text , target_lang=target)



