import numpy as np
import cv2
import cv2.text as cvt
import pytesseract
from PIL import Image


def get_live_feed():

    cap = cv2.VideoCapture()

    while True:
        ret , frame = cap.read()
        if not ret:
            break #if no feed, break

        frame = cv2.flip(frame , 1)
        def ocr(frame):
            pil_image = Image.fromarray(frame)
            text = pytesseract.image_to_string(pil_image)
            return text

        gray_frame = np.ascontiguousarray(cv2.cvtColor(frame , cv2.COLOR_BGR2GRAY) , dtype=uint8)

        result = ocr(gray_frame)

def get_image():

    img = "whateverisent.jpg"
    text = pytesseract.image_to_string(Image.open(img))
    return text





