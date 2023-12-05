from flask import Flask, request, render_template, session, redirect, url_for
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3
from database.database import login_user

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
        # conn.commit()
        password2 = row[0][4]

        # Ensure username exists and password is correct
        if len(row) != 1 or not check_password_hash(password2, password):
            return render_template('templates/error.html', errormessage='No such user exists')
        user_id = row[0][0]

        session["user_id"] = user_id
        user_info = get_info(user_id) 
        all_info = get_info2(user_id)
        lab_info = get_lab(user_id)
        # lab_info = lab_info[0]
        if lab_info:
            lab_info = lab_info[0]
            return render_template("templates/researcher.html", user_info=user_info, lab_info=lab_info)
        return render_template("templates/participant.html", user_id=user_id, user_info=user_info, all_info=all_info)
    else:
        return render_template("templates/login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/profile")
def user_profile():
    return render_template('templates/profile.html')


@app.route("/aboutus")
def aboutus():
    return render_template('templates/aboutus.html')


@app.route("/search") # TODO: change url name
def browser():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    query = "SELECT * FROM trials"
    cursor.execute(query)
    all_trials = cursor.fetchall()
    user_id = session["user_id"]

    return render_template('templates/search.html', all_trials=all_trials)

@app.route("/homepage")
def homepage():
    return render_template('templates/participant.html')


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

        
        if request.form.get('account_type') == 'participant':
            participant = 1        # participant
        else:
            participant = 0        # researcher
        

        # Ensure password confirmation matches
        confirmation = request.form.get("confirmation")
        if password != confirmation:
            return render_template('templates/register.html', errormessage='Passwords do not match')

        # Update users database with new user
        query = "INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)"
        values = (firstname, lastname, email, hash, participant)
        cursor.execute(query, values)
        conn.commit()
        query = "SELECT id FROM users WHERE email = ?"
        values = (email, )
        cursor.execute(query, values)
        new_user = cursor.fetchall()
        new_user = new_user[0][0]
        session["user_id"] = new_user

        # Session id / cookies with user's id
        # user_id = cursor.execute("SELECT id FROM users WHERE email = ?", (email, ))
        # session["user_id"] = user_id

        # Redirect to participant information page
        if participant:
            return redirect("/participant_info")
        else:
            return redirect("/researcherinfo")
    
    else:
        return render_template("templates/register.html")
    

@app.route("/participant_info", methods=["GET", "POST"])
def participant_info():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    if request.method == "POST":
<<<<<<< HEAD:app.py
        dob = request.form.get("dob")
        sex = request.form.get("sex")
        drink = request.form.get("drink")
        smoke = request.form.get("smoke")
        diseases = request.form.get("diseases")
        # user_id = request.args.get('user_id')
        user_id = session["user_id"]
        query2 = "INSERT INTO participant_info (user_id, age, sex, drink, smoke, diseases) VALUES (?, ?, ?, ?, ?, ?)"
        values2 = (user_id, dob, sex, drink, smoke, diseases)
        cursor.execute(query2, values2)
        cursor.fetchall()
        conn.commit()
        user_info = get_info(user_id) 
        all_info = get_info2(user_id)
        return render_template("templates/participant.html", user_info=user_info, all_info=all_info)
=======
        # Insert info into db
        return render_template("templates/participant.html")
>>>>>>> main:backend/app.py
    else:
        return render_template("templates/participant_info.html")
    

@app.route("/researcherinfo", methods=["GET", "POST"])
def researcherinfo():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]
    if request.method == "POST":
        lab_name = request.form.get("lab_name")
        about_lab = request.form.get("about_lab")
        query = "INSERT INTO labs (pi_id, about, name) VALUES (?, ?, ?)"
        values = (user_id, about_lab, lab_name)
        cursor.execute(query, values)
        # cursor.fetchall()
        conn.commit()
        lab_query = "SELECT id FROM labs WHERE name = ?"
        values = (lab_name, )
        cursor.execute(lab_query, values)
        lab_id = cursor.fetchall()
        lab_id = lab_id[0][0]
        query = "INSERT INTO researcher_info (user_id, lab_id) VALUES (?, ?)"
        values = (user_id, lab_id)
        cursor.execute(query, values)
        conn.commit()
        user_info = get_info(user_id)
        lab_info = get_lab(user_id)
        return render_template("templates/researcher.html", user_info=user_info, lab_info=lab_info)
    else:
        query = "SELECT * FROM labs"
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.commit()
        return render_template("templates/researcher_info.html", labs=rows)

@app.route("/trial_form", methods=["GET", "POST"])
def trial_form():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]
    return render_template("templates/trial_form.html")
    
@app.route("/trial_submit", methods=["GET", "POST"])
def trial_submit():
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]
    if request.method == "POST":
        department = request.form.get("department")
        description = request.form.get("trial_description")
        location = request.form.get("location")
        sex = request.form.get("sex")
        age_min = request.form.get("age_min")
        age_max = request.form.get("age_max")
        drink = request.form.get("drinking_habits")
        smoke = request.form.get("smoking_habits")
        diseases = request.form.get("diseases")
        query = "INSERT INTO trials (researcher_id, department, description, location, age_min, age_max, sex, drink, smoke, diseases) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        values = (user_id, department, description, location, age_min, age_max, sex, drink, smoke, diseases)
        cursor.execute(query, values)
        conn.commit()
        user_info = get_info(user_id)
        lab_info = get_lab(user_id)
        return render_template("templates/researcher.html", user_info=user_info, lab_info=lab_info)

@app.route("/trial_info<int:trial_id>", methods=["GET"])
def trial_info(trial_id):
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]
    if request.method == "GET":
        query = 'SELECT * FROM trials WHERE id = ?'
        values = (trial_id, )
        cursor.execute(query, values)
        specific_trial = cursor.fetchone()
        conn.close()
        specific_trial = create_dict(specific_trial)
        return render_template("templates/trial_info.html", specific_trial=specific_trial)
    
@app.route("/favorited<int:trial_id>", methods=["GET"])
def favorited(trial_id):
    print("saved")
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]

    if request.method == "GET":
        query = 'SELECT * FROM saved WHERE user_id = ? AND trial_id = ?'
        values = (user_id, trial_id)
        cursor.execute(query, values)
        check = cursor.fetchone()
        # If user does, check will be true
        if check:
            # Return apology if user has already favorited it
            print("Sorry, already saved")
            conn.close()
        else:
            # Since the entry has not been favorited, add it to the favorites table
            query = 'INSERT INTO saved (user_id, trial_id) VALUES (?, ?)'
            values = (user_id, trial_id)
            cursor.execute(query, values)
            conn.commit()
            conn.close()
        # Redirect to /favorites function to render template
        return redirect("/favorites")


@app.route("/favorites", methods=["GET"])
def favorites():
    """Display user's favorited entries"""
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()
    user_id = session["user_id"]

    if request.method == "GET":
        # Get all the entries that the user favorited and return template
        query = 'SELECT * FROM trials JOIN saved ON trials.id = saved.trial_id WHERE saved.user_id = ?'
        values = (user_id, )
        cursor.execute(query, values)
        saved_trials = cursor.fetchall()
        print(saved_trials)
        return render_template("templates/favorites.html", saved_trials=saved_trials)


def create_dict(trial):
    keys = ['id', 'researcher_id', 'department', 'description', 'location', 'min_age', 'max_age', 'sex', 'drink', 'smoke', 'diseases']
    return dict(zip(keys, trial))

def get_lab(user_id):
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()

    query = 'SELECT name FROM labs WHERE pi_id = ?'
    values = (user_id, )
    cursor.execute(query, values)
    user_info = cursor.fetchone()
    conn.close()
    return user_info

def get_info(user_id):
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()

    query = 'SELECT * FROM users WHERE id = ?'
    values = (user_id, )
    cursor.execute(query, values)
    user_info = cursor.fetchone()
    conn.close()
    return user_info

def get_info2(user_id):
    conn = sqlite3.connect('labrats.db')
    cursor = conn.cursor()

    query = 'SELECT * FROM participant_info WHERE user_id = ?'
    values = (user_id, )
    cursor.execute(query, values)
    user_info = cursor.fetchall()
    conn.close()
    return user_info