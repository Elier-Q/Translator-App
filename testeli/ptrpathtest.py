import pytesseract 
from PIL import Image 
import requests 
import io

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

response = requests.get('https://i.sstatic.net/J2ojU.png') 
img = Image.open(io.BytesIO(response.content))
text = pytesseract.image_to_string(img, lang='eng', config='--psm 7')

print(text)



