from flask import Flask, request, render_template, session, redirect
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3
from flask_cas import CAS

# Configure application
app = Flask(__name__)

# CAS stuff
CAS(app)
app.config['CAS_SERVER'] = 'https://secure6.its.yale.edu/cas/login'
app.config['CAS_AFTER_LOGIN'] = '/login'

# Connect to the SQLite database
conn = sqlite3.connect('labrats.db')
cursor = conn.cursor()

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/login", methods=["GET", "POST"])
def login():
    
    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure email was submitted
        if not request.form.get("email"):
            return render_template('error.html', errormessage='Please enter a username')

        # Ensure password was submitted
        elif not request.form.get("password"):
            return render_template('error.html', errormessage='Please enter a passwork')

        # Query database for username
        rows = cursor.execute("SELECT * FROM users WHERE email = ?", request.form.get("email"))

        # Ensure email exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return render_template('error.html', errormessage='Invalid email or password')

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():

    # Return registration page
    if request.method == "GET":
        return render_template("register.html")

    # Update users database to register new user and return to homepage
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Ensure username was submitted
        if not request.form.get("username"):
            return render_template('error.html', errormessage='Please enter a username')

        # Ensure password was submitted
        elif not request.form.get("password"):
            return render_template('error.html', errormessage='Please enter a password')

        # Ensure password confirmation matches
        confirmation = request.form.get("confirmation")
        if password != confirmation:
            return render_template('error.html', errormessage='Passwords do not match')

        # Update users database with new user
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", email, generate_password_hash(password))

        # Session id / cookies with user's id
        session["user_id"] = cursor.execute("SELECT id FROM users WHERE email = ?", email)

        # Redirect to login
        return redirect("/login")
    

conn.commit()
conn.close()
