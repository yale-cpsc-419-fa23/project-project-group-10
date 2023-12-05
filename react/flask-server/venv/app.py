from flask import Flask, request, render_template, session, redirect, url_for, jsonify
from flask_session import Session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Connect to the SQLite database
conn = sqlite3.connect('labrats.db')
cursor = conn.cursor()

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    return jsonify({
        "id": 1,
        "email": email
    })

def get_db_connection():
    conn = sqlite3.connect('labrats.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/register-participant", methods=["POST"])
def register_par():
    try:
        firstname = request.json["first_name"]
        lastname = request.json["last_name"]
        email = request.json["email"]
        password = request.json["password"]
        confirmation = request.json["confirmation"]
        role = 0

        dob = request.json["dob"]
        sex = request.json["sex"]
        drink = request.json["drink"]
        smoke = request.json["smoke"]
        diseases = request.json["disease"]

        conn = get_db_connection()
        cursor = conn.cursor()

        #checking if the passwords match
        if password != confirmation:
            return jsonify({"error": "Passwords do not match!"}), 409

        #check to see if username in this role exists
        query = "SELECT id FROM users WHERE email = ? AND role = ?"
        cursor.execute(query, (email, role))
        user = cursor.fetchone()

        if user:
            return jsonify({"error": "This email exists as a Participant"}), 409
        
        # Update users database with new user
        query = "INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)"
        values = (firstname, lastname, email, generate_password_hash(password), role)
        cursor.execute(query, values)
        conn.commit()


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@app.route("/login", methods=["POST"])
def login_user():
    try: 
        email = request.json["email"]
        password = request.json["password"]

        if not email or not password:
                return jsonify({'error': 'Invalid request'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Query the database for the user with the provided email
        query = "SELECT * FROM users WHERE email = ?"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        print(user)
    
        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401
        
        if user and check_password_hash(user['password'], password):
                # If the user exists and the password matches, return user info
                return jsonify({
                    'user_info': {
                        'id': user['id'],
                        'email': user['email'],
                        'role': user['role']  # Example field indicating user type
                    }
                })
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
      
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

        # Ensure password confirmation matches
        confirmation = request.form.get("confirmation")
        if password != confirmation:
            return render_template('templates/register.html', errormessage='Passwords do not match')

        # Update users database with new user
        query = "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)"
        values = (firstname, lastname, email, generate_password_hash(password))
        cursor.execute(query, values)
        conn.commit()

        # Session id / cookies with user's id
        user_id = cursor.execute("SELECT id FROM users WHERE email = ?", (email, ))
        # session["user_id"] = user_id

        # Redirect to participant information page
        selected_option = request.form.get('account_type')
        print(selected_option)
        if selected_option == 'participant':
            return redirect("/participantinfo")
        elif selected_option == 'researcher':
            return redirect("/researcherinfo")
    
    else:
        return render_template("templates/register.html")
    

@app.route("/participantinfo", methods=["GET", "POST"])
def participantinfo():
    if request.method == "POST":
        # Insert info into db
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
    
@app.route("/researcher-post-form", methods=["GET", "POST"])
def post_form():
    try:
        title = request.json["title"]
        location = request.json["location"],
        start_date = request.json["start_date"],
        end_date = request.json["end_date"],
        description = request.json["description"],
        duration = request.json["duration"],
        compensation = request.json["compensation"],
        department = request.json["department"],
        age_min = request.json["ageMin"], 
        age_max= request.json["ageMax"],
        sex = request.json["selectedSex"],
        smoke = request.json["smoking"], 
        drink = request.json["drinking"], 

        conn = get_db_connectionn()
        cursor = conn.cursor()

        query = "INSERT INTO trials (researcher_id, department, description, location, age_min, age_max, sex, drink, smoke) VALUES (?, ?, ?, ?
        values = (user_id, department, description, location, age_min, age_max, sex, drink, smoke)
        cursor.execute(query, values)
        user = cursor.fetchone()
        print(user)

            
        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
conn.commit()
conn.close()

if __name__ == '__main__':
    app.run(debug=True)  # Runs the application in debug mode
