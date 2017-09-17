from flask import Flask, render_template, redirect
from sqlalchemy import create_engine, MetaData
from flask_login import UserMixin, LoginManager, login_user, logout_user
from flask_blogging import SQLAStorage, BloggingEngine

# initialize the application
app = Flask(__name__)
app.config.from_object('config')

# sqlalchemy + flask-blogging stuff
engine = create_engine('sqlite:////zmsy.db')
meta = MetaData()
sql_storage = SQLAStorage(engine, metadata=meta)
blog_engine = BloggingEngine(app, sql_storage)
login_manager = LoginManager(app)
meta.create_all(bind=engine)


@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    """
    The main route to the homepage. The "/home" link will be used elsewhere around the site to navigate users back home.
    """
    page_info = {
        "page_title": "home",
        "post_title": "This is an Example Post",
        "post_subtitle": "In which I Will Explain the Entirety of the Universe"
    }
    return render_template('home.html', **page_info)

@app.route('/about')
def about():
    """
    The route to the about page, where the user can learn about me and find contact information.
    """
    page_info = {
        "page_title": "about"
    }
    return render_template('about.html', **page_info)


# error handlers
@app.errorhandler(404)
def page_not_found(error):
    """
    Return the 404 page for any times where the URL could not be found.
    """
    page_info = {
        "page_title": "404 - Page Not Found",
        "error": "The page you're looking for does not exist",
        "suggestion": "Please check the URL and try again."
    }
    return render_template('error.html', **page_info), 404


@app.errorhandler(500)
def exception_handler(error):
    """
    If there's an internal error in the application at any point, serve up the 500 page.
    """
    page_info = {
        "page_title": "500 - Internal Server Error",
        "error": "Oops! Internal server error.",
        "suggestion": "Give it a little bit and try again."
    }
    return render_template('error.html', **page_info), 500

# run the app
app.run(debug=True, use_reloader=True)