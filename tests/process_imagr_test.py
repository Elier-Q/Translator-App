from fastapi import File , UploadFile
import numpy as np
from PIL import Image
import pytesseract
import cv2
import io
import os

def process_image(file: UploadFile = File()):

    content = file.file.read()
    image = np.array(Image.open(io.BytesIO(content)))

    gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray_frame)

    return text

with open('transapp/tests/script.png', 'rb') as f:
    file = UploadFile(filename='script.png', file=f)
    txt = process_image(file)
with open("recognized.txt", "a") as file:
    file.write(txt)
    file.write("\n")