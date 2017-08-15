from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return "Hello world!"

app.run(debug=True)