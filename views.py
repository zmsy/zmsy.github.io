from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/home')