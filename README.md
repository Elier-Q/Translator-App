This is a translating app which uses OpenCV and pytesseract to read an im age captured by a typescript react native client side framework an then translates that captured footage and spits it out to the reader.
Unfortunately we encountered various issues especially with expo as per a recent update on SDK 52 changing many frameworks and the integration of fastapi and Axios as we eventually found out that on iOS the uri that we recieve is the raw uri that leads to the photo library is sandboxed and had to switch to fetch last minute but ultimately we could not get the text specifically sent directly from the phone to read correctly in the FastAPI. 


License: Elier and Alex. Thank you!
