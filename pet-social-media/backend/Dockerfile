# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend
COPY . .

# Start the Flask server
CMD ["python", "app.py"]

# Expose port
EXPOSE 5000
