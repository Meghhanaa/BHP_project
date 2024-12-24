from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/hello')
def hello():
    return "meghh"

if __name__ == "__main__":
    print("Starting flask server")
    app.run()