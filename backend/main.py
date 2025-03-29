import pytesseract 
from PIL import Image 
import requests 
import io

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

##response = requests.get('https://pixabay.com/illustrations/stop-stop-sign-road-sign-7943805/') 
##img = Image.open(io.BytesIO(response.content))
img = 'transapp/backend/Stop2.jpg'
text = pytesseract.image_to_string(Image.open(img), lang='eng', config='--psm 1')

print(text)