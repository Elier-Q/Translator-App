import axios from 'axios';

const imageBase64Uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...";  // Example Base64 string

// FastAPI backend URL
const backendUrl = 'http://127.0.0.1:8000/image-uri';

// Prepare the data to send (Base64 URI)
//const data = { image_base64: imageBase64Uri };

// Use Axios to send a POST request to FastAPI
axios.post(backendUrl, imageBase64Uri)
  .then(response => {
    console.log('Extracted text from image:', response.data.text);
  })
  .catch(error => {
    console.error('Error:', error);
  });