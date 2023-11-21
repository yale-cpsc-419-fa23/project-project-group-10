from flask import Flask, request, render_template, session, redirect, send_from_directory
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

        # Query database for username
        query = "SELECT * FROM users WHERE email = ?"
        values = (email, )
        cursor.execute(query, values)
        row = cursor.fetchall()
        # print(row)
        # conn.commit()
        password2 = row[0][-1]
        # print(password2)
        # Ensure username exists and password is correct
        if len(row) != 1 or not check_password_hash(password2, password):
            return render_template('templates/error.html', errormessage='No such user exists')
        # query = "SELECT id FROM users WHERE email = ?"
        # user_id = cursor.execute(query, (email, ))
        user_id = row[0][0]
        print(user_id)
        session["user_id"] = user_id               # doesn't work

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
        firstname = request.form.get("first_name")
        lastname = request.form.get("last_name")
        email = request.form.get("email")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        hash = generate_password_hash(password)

        # Ensure password confirmation matches
        confirmation = request.form.get("confirmation")
        if password != confirmation:
            return render_template('templates/register.html', errormessage='Passwords do not match')

        # Update users database with new user
        query = "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)"
        values = (firstname, lastname, email, hash)
        cursor.execute(query, values)
        row = cursor.fetchall()
        conn.commit()
        query = "SELECT id FROM users WHERE email = ?"
        values = (email, )
        cursor.execute(query, values)
        new_user = cursor.fetchall()
        print(new_user)
        new_user = new_user[0][0]
        print(new_user)
        session["user_id"] = new_user

        # Session id / cookies with user's id
        # user_id = cursor.execute("SELECT id FROM users WHERE email = ?", (email, ))
        # session["user_id"] = user_id

        # Redirect to participant information page
        selected_option = request.form.get('account_type')
        print(selected_option)
        if selected_option == 'participant':
            return redirect("/participant_info")
        elif selected_option == 'researcher':
            return redirect("/researcherinfo")
    
    else:
        return render_template("templates/register.html")
    

@app.route("/participant_info", methods=["GET", "POST"])
def participant_info():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    if request.method == "POST":
        dob = request.form.get("dob")
        sex = request.form.get("sex")
        drink = request.form.get("drink")
        smoke = request.form.get("smoke")
        diseases = request.form.get("diseases")
        print("WE IN PARTICIPANT INFO")
        query2 = "INSERT INTO participant_info (age, sex, drink, smoke, diseases) VALUES (?, ?, ?, ?, ?)"
        values2 = (dob, sex, drink, smoke, diseases)
        
        cursor.execute(query2, values2)
        cursor.fetchall()
        conn.commit()
<<<<<<< Updated upstream
=======
        print("WE IN PARTICIPANT INFO")
>>>>>>> Stashed changes
        return render_template("templates/participant.html")
    else:
        return render_template("templates/participant_info.html")
    

@app.route("/researcherinfo", methods=["GET", "POST"])
def researcherinfo():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    if request.method == "POST":
        # Insert info into db
        return render_template("templates/researcher_info.html")
    else:
        query = "SELECT * FROM labs"
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.commit()
        return render_template("templates/researcher_info.html", labs=rows)

# @app.route("/participant", methods=["GET", "POST"])
# def homepage():
#     print("WE MADE IT")
#     return render_template("templates/participant.html")
# conn.commit()
# conn.close()
