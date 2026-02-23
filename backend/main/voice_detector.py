from dotenv import load_dotenv
import os
import json
import openai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExtractRequest(BaseModel):
    text: str

def get_ai_response(text):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """Extract the following information from the user input:

* Job Title
* Full Name
* Email
* Address
* Phone Number

Return ONLY valid JSON in this format:
{
  "title": "",
  "name": "",
  "email": "",
  "address": "",
  "phone_number": ""
}

Do not include explanations.
Do not include markdown.
Return raw JSON only."""
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    raw = response.choices[0].message.content.strip()
    # Remove possible markdown ticks just in case the LLM incorrectly includes them
    if raw.startswith("```json"):
        raw = raw[7:]
    if raw.startswith("```"):
        raw = raw[3:]
    if raw.endswith("```"):
        raw = raw[:-3]
    parsed = json.loads(raw.strip())
    return parsed

@app.post("/extract")
async def extract_info(req: ExtractRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    try:
        result = get_ai_response(req.text)
        return result
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI did not return valid JSON")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def listen():
    try:
        import speech_recognition as sr
    except ImportError:
        print("speech_recognition module not installed")
        return

    recognizer = sr.Recognizer()
    print("Listening... (Press Ctrl+C to stop)")

    while True:
        try:
            with sr.Microphone() as source:
                recognizer.adjust_for_ambient_noise(source, duration=0.5)
                print("\nSpeak now:")
                audio = recognizer.listen(source, phrase_time_limit=10)

            text = recognizer.recognize_google(audio)
            print("\nYou said:", text)

            print("\nExtracting data...")
            result = get_ai_response(text)

            print("\nExtracted JSON:")
            print(json.dumps(result, indent=4))

        except Exception as e:
            if type(e).__name__ == "UnknownValueError":
                print("Could not understand audio, try again...")
            elif type(e).__name__ == "RequestError":
                print("Error retrieving audio:", str(e))
            elif isinstance(e, json.JSONDecodeError):
                print("AI did not return valid JSON, try again...")
            elif isinstance(e, KeyboardInterrupt):
                print("\nStopped listening.")
                break
            else:
                print("Error:", str(e))

if __name__ == "__main__":
    import uvicorn
    # Optional wrapper to start API if executed directly but conventionally run via uvicorn terminal
    listen()