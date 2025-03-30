import numpy as np
import cv2
import cv2.text as cvt
import pytesseract
from PIL import Image
from fastapi import File , UploadFile
import io

async def process_image(file: UploadFile = File()):

    content = await file.read()
    image = np.array(Image.open(io.BytesIO(content)))

    gray_frame = np.ascontiguousarray(cv2.cvtColor(image , cv2.COLOR_BGR2GRAY) , dtype=np.uint8)

    text = pytesseract.image_to_string(gray_frame)

    return text

