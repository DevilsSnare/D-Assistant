from flask import Flask, app, render_template, request
import urllib.request
import requests
import assistant

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/record', methods=['POST'])
def record():
    text, name, age, date, medicine = assistant.liveRecord()
    return {
        "text": text,
        "name": name,
        "age": age,
        "date": date,
        "medicine": medicine
    }


if __name__ == "__main__":
    app.run(debug=True)
