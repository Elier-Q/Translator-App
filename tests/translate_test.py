import requests

def langcode(lang: str):
    url = "https://api-free.deepl.com/v2/languages"
    headers = {"Authorization": "DeepL-Auth-Key 86cead83-acdf-4c04-b299-47afe2d50034:fx"}

    try:
        response = requests.get(url, headers=headers, timeout=5)  
        response.raise_for_status()  

        print("Response JSON:", response.json())  # Debugging print statement

        languages = response.json()

        for l in languages:
            print(f"Checking: {l}")  # See what data is inside
            if l.get('name', '').lower() == lang.lower():
                return l.get('language')

    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")

    return None  

# Test the function
print(langcode("English"))  

