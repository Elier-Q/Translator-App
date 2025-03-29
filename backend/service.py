import cv2
import cv2.text as cvt
import pytesseract

cap = cv2.VideoCapture()

while True:
    ret , frame = 