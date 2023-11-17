from flask import Flask, request, render_template, session, redirect
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3
from database import login_user

from flask import Flask, request, make_response, render_template, jsonify
# import requests
# from flask_cas import CAS

# Configure application
app = Flask(__name__, template_folder='.')

# CAS stuff
# CAS(app)
# app.config['CAS_SERVER'] = 'https://secure6.its.yale.edu/cas/login'
# app.config['CAS_AFTER_LOGIN'] = '/login'

# Connect to the SQLite database
conn = sqlite3.connect('labrats.db')
cursor = conn.cursor()

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/', methods=['GET'])
def index():
    return render_template('templates/index.html')


@app.route("/login", methods=["GET", "POST"])
def login():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()

    session.clear()
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        
        user = login_user(email, password)
        if len(user) != 1:
            return render_template('templates/error.html', errormessage='No such user exists')
        
        user_id = cursor.execute("SELECT id FROM users WHERE email = ?", (email, ))
        # session["user_id"] = user_id               # doesn't work
        return render_template("templates/participant.html")
    else:
        return render_template("templates/login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/profile")
def user_profile():
    return render_template('profile.html')


@app.route("/aboutus")
def aboutus():
    return render_template('aboutus.html')


@app.route("/search") # TODO: change url name
def browser():
    return render_template('search.html')

@app.route("/homepage")
def homepage():
    return render_template('participant.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")

        # Ensure password confirmation matches
        confirmation = request.form.get("confirmation")
        if password != confirmation:
            return render_template('templates/register.html', errormessage='Passwords do not match')

        # Update users database with new user
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", email, password)

        # Session id / cookies with user's id
        user_id = cursor.execute("SELECT id FROM users WHERE email = ?", (email, ))
        # session["user_id"] = user_id

        # Redirect to participant information page
        return redirect("/participantinfo")
    
    else:
        return render_template("templates/register.html")
    

@app.route("/participantinfo", methods=["GET", "POST"])
def participantinfo():
    if request.method == "POST":
        # Insert info into db
        return render_template("templates/participant_info.html")
    else:
        return render_template("templates/participant_info.html")

conn.commit()
conn.close()
