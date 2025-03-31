import uvicorn
import requests
import deepl
import io
import numpy as np
import cv2
import logging
from fastapi import UploadFile, File
from PIL import Image
import pytesseract
from base64 import b64decode , b64encode
import os
import re


pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

async def process_image_uri(uri: str):
    try:

        image = Image.open(uri)
        image = np.array(image)

        # convert rgb to bgr
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray_frame = image

        text = pytesseract.image_to_string(gray_frame)
        text = re.sub('\n' , '' , text)
        return text

    except Exception as e:
        logging.error(f"Error processing the image: {e}")
        return "Error processing the image"

async def process_image_file(file: UploadFile = File()):
    try:

        content = await file.read()

        image = Image.open(io.BytesIO(content))
        image = np.array(image)

        # convert rgb to bgr
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray_frame = image

        text = pytesseract.image_to_string(gray_frame)
        return text

    except Exception as e:
        logging.error(f"Error processing the image: {e}")
        return "Error processing the image"

async def process_feed(image_bytes: bytes):

    try:
        image = np.array(Image.open(io.BytesIO(image_bytes)))

            # convert rgb to bgr
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray_frame = image

        text = await pytesseract.image_to_string(gray_frame)
        return text

    except Exception as e:
        logging.error(f"Error processing the image: {e}")
        return "Error processing the image"

def langcode(lang: str):

    url = 'https://api-free.deepl.com/v2/languages'
    headers = {"Authorization": "DeepL-Auth-Key 86cead83-acdf-4c04-b299-47afe2d50034:fx"}  # Correct API key format

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
def translate(text: str , target: str):
    
    translator = deepl.Translator('86cead83-acdf-4c04-b299-47afe2d50034:fx')

    return translator.translate_text(text , target_lang=target)



