import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

img = cv2.imread('transapp/tests/stop.png')

gray = cv2.cvtColor(img , cv2.COLOR_BGR2GRAY)

ret , thresh1 = cv2.threshold(gray , 0 , 255 , cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)

rect_k = cv2.getStructuringElement(cv2.MORPH_RECT , (20,20))

dilation = cv2.dilate(thresh1 , rect_k , iterations=1)

contours , hierarchy = cv2.findContours(dilation , cv2.RETR_EXTERNAL , cv2.CHAIN_APPROX_NONE)


img2 = img.copy()

file = open("recognized.txt", "w+")
file.write("")
file.close()


for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    
    rect = cv2.rectangle(img2, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    cropped = img2[y:y + h, x:x + w]
    
    file = open("recognized.txt", "a")
    
    text = pytesseract.image_to_string(cropped)
    
    file.write(text)
    file.write("\n")
    
    file.close()

