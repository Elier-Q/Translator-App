import pytesseract 
from PIL import Image 
import requests 
import io

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'
<<<<<<< HEAD:backend/main.py

##response = requests.get('https://pixabay.com/illustrations/stop-stop-sign-road-sign-7943805/') 
##img = Image.open(io.BytesIO(response.content))
img = 'transapp/backend/Stop2.jpg'
text = pytesseract.image_to_string(Image.open(img), lang='eng', config='--psm 1')

print(text)
=======
print(pytesseract.image_to_string(Image.open('transapp/backend/script.jpg')))
>>>>>>> 99a9b4a03f98673abcd3552e79cd2c267c8b1102:tests/ocr_test.py
