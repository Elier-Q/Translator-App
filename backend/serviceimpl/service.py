import numpy as np
import cv2
import pytesseract
from PIL import Image
from fastapi import File , UploadFile
import io

async def process_image(file: UploadFile = File()):

    content = await file.read()
    image = np.array(Image.open(io.BytesIO(content)))

    gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray_frame)

    return text

