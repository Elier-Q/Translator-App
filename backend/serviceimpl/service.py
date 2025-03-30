import numpy as np
import cv2
import pytesseract
from PIL import Image
from fastapi import File , UploadFile
import io
import deepl
import requests

async def process_image(file: UploadFile = File()):

    content = await file.file.read()
    image = np.array(Image.open(io.BytesIO(content)))

    gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray_frame)

    return text

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



