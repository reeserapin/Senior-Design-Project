from flask import Flask
from flask_cors import CORS  # For handling cross-origin requests

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Root route (this should handle requests to http://localhost:5000/)
@app.route('/')
def home():
    return "Hello, Flask is running!"

# Run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Accessible from any IP
