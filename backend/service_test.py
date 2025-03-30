import numpy as np
import cv2
import cv2.text as cvt
import pytesseract
from PIL import Image
from fastapi import File , UploadFile
import io

async def process_image(file: UploadFile = File()):

    content = file.read()
    image = Image.open(io.BytesIO(content))

    gray_frame = np.ascontiguousarray(cv2.cvtcolor(image , cv2.COLOR_BGR2GRAY) , dtype=uint8)

    text = pytesseract.image_to_string(gray_frame)

    return text

    




