from flask import Flask, render_template
from flaskext.markdown import Markdown
app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    """
    The main route to the homepage. The "/home" link will be used elsewhere around the site to navigate users back home.
    """
    page_data = {
        "title": "home"
    }
    return render_template('home.html', page_data=page_data)


# error handlers
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def exception_handler(error):
    return render_template('500.html'), 500

# run the app
app.run()