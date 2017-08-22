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
        "page_title": "home",
        "post_title": "This is an Example Post"
    }
    return render_template('home.html', page_data=page_data)


# error handlers
@app.errorhandler(404)
def page_not_found(error):
    """
    Return the 404 page for any times where the URL could not be found.
    """
    page_data = {
        "title": "404 - Page Not Found",
        "error": "The page you're looking for does not exist",
        "suggestion": "Please check the URL and try again."
    }
    return render_template('404.html', page_data=page_data), 404


@app.errorhandler(500)
def exception_handler(error):
    """
    If there's an internal error in the application at any point, serve up the 500 page.
    """
    page_data = {
        "title": "500 - Internal Server Error",
        "error": "Oops! Internal server error.",
        "suggestion": "Give it a little bit and try again."
    }
    return render_template('500.html', page_data=page_data), 500

# run the app
app.run()