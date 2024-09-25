from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual Gemini API keys and endpoint
GEMINI_API_URL = "https://api.gemini.com/nlu/v1/analyze"
GEMINI_API_KEY = "your_gemini_api_key_here"

# Function to interact with Gemini API
def analyze_sentiment(user_input):
    headers = {
        'Authorization': f'Bearer {GEMINI_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        "text": user_input
    }
    
    response = requests.post(GEMINI_API_URL, json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to process request"}

# Function to generate an empathetic response
def generate_response(sentiment_data):
    sentiment = sentiment_data.get("sentiment", "neutral")
    
    if sentiment == "positive":
        return "I'm glad to hear you're feeling good! Keep up the positive mindset!"
    elif sentiment == "negative":
        return "I'm sorry you're feeling this way. Would you like some tips on how to cope with this?"
    elif sentiment == "neutral":
        return "It seems like you're feeling neutral. Is there something specific on your mind?"
    else:
        return "I'm here for you, no matter how you're feeling."

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    # Analyze the sentiment
    sentiment_data = analyze_sentiment(user_input)
    
    # Generate a response based on sentiment
    if "error" in sentiment_data:
        bot_response = "I'm having trouble understanding right now. Could you try again?"
    else:
        bot_response = generate_response(sentiment_data)
    
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
