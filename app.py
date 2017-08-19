from flask import Flask, render_template
from flaskext.markdown import Markdown
app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    page_data = {
        "title": "home"
    }
    return render_template('home.html', page_data=page_data)

app.run(debug=True)