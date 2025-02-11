# How to Run Our Pet Social Media Website  

Our pet social media website can be run locally from VS Code using Flask and accessed via a public link.  

## Command Line  

To start the Flask server, navigate to the project directory and run:  

```bash
python app.py
```  

By default, Flask runs on `http://127.0.0.1:5000/`.  

To make it publicly accessible, use [ngrok](https://ngrok.com/):  

1. Start the Flask server:  

   ```bash
   python app.py
   ```

2. In a new terminal, run:  

   ```bash
   ngrok http 5000
   ```

3. Copy the generated **public URL** and share it to access the site remotely.  

## Link to website  

More details to come. Open the website in a browser using the provided local or public link.  
