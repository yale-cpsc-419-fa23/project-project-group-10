from flask import Flask, request, render_template, session, redirect, url_for, jsonify, make_response
from flask_session import Session
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3
import json

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)

# Connect to the SQLite database
conn = sqlite3.connect('labrats.db')
cursor = conn.cursor()

# # Configure session to use filesystem (instead of signed cookies)
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)

# Configure your application with JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret in production
jwt = JWTManager(app)


@app.route("/")
def hello_world():
    return "Hello, World!"


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

@app.route("/participant-signup", methods=["POST"])
def signup():
    return jsonify({
        "id": 1,
    })

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
        user_id = user["id"]

        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401
        
        if user and check_password_hash(user['password'], password):
                # If the user exists and the password matches, return user info
                access_token = create_access_token(identity=user['id'])
                print(access_token)
                return jsonify({
                    'access_token': access_token,
                    'user_info': {
                        'id': user_id,
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

@app.route('/fetch-data', methods=['GET'])
@jwt_required(optional=True)
def fetch_data():
    print('hello')
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM trials"
    cursor.execute(query)
    columns = [column[0] for column in cursor.description]

    # Convert each row to a dictionary
    server_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    print(server_data)
    return jsonify(server_data)

@app.route('/favorite', methods=['POST'])
@jwt_required() 
def favorite(): 
    current_user_id = get_jwt_identity()

    print(current_user_id)

    data = request.json
    trial_id = data['data']['id']
    print(trial_id)
    # print("THIS IS THE TRIAL_ID TO INSERT", trial_id)
    # print("this is from the fave button", data)
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO saved (user_id, trial_id) VALUES (?, ?)"
    values = (current_user_id, trial_id)
    cursor.execute(query, values)
    conn.commit()
    return jsonify({'message': 'Widget added to favorites successfully'})

@app.route('/unfavorite', methods=['POST'])
@jwt_required() 
def unfavorite():
    print('WE MADE IT TO UNFAVORITE') 

@app.route('/all_favorites', methods=['POST'])
@jwt_required() 
def all_favorites(): 
    current_user_id = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM trials JOIN saved ON trials.id = saved.trial_id WHERE saved.user_id = ?"
    values = (current_user_id,)
    cursor.execute(query, values)
    columns = [column[0] for column in cursor.description]
    server_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return jsonify(server_data)

@app.route('/all_created', methods=['POST'])
@jwt_required() 
def all_created(): 
    print("we got here")
    current_user_id = get_jwt_identity()
    print("THIS IS CURR USER:", current_user_id)
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM trials WHERE researcher_id = ?"
    values = (current_user_id,)
    cursor.execute(query, values)
    columns = [column[0] for column in cursor.description]
    server_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    print(server_data)
    return jsonify(server_data)


@app.route('/participant-search', methods=['POST'])
def participant_search():
    # try:
        # Get the selectedAge and selectedSex from the request data
    #current_user_id = get_jwt_identity()
    print("goodbye")

    data = request.json
    selectedAge = data.get('selectedAge')
    selectedSex = data.get('selectedSex')
    # print(selectedAge)
    # print(selectedSex)
    conn = get_db_connection()
    cursor = conn.cursor()
    if selectedAge == "18+":
        query = "SELECT * FROM trials WHERE age_min >= 18 AND sex LIKE ?"
        cursor.execute(query, (selectedSex,))
        columns = [column[0] for column in cursor.description]
        filtered_studies = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(filtered_studies)
    if selectedAge == "Under 18":
        query = "SELECT * FROM trials WHERE age_min < 18 AND sex LIKE ?"
        cursor.execute(query, (selectedSex,))
        columns = [column[0] for column in cursor.description]
        filtered_studies = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(filtered_studies)
    if selectedAge == "All Ages" and selectedSex == "All":
        query = "SELECT * FROM trials"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        server_data = [dict(zip(columns, row)) for row in cursor.fetchall()]   
        return jsonify(server_data)


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
        session["user_id"] = user_id 

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
    
@app.route("/researchertrial", methods=["POST"])
@jwt_required() 
def trial_form():

    current_user_id = get_jwt_identity()
    title = request.json["title"]
    location = request.json["location"]
    description = request.json["description"]
    duration = request.json["duration"]
    compensation = request.json["compensation"]
    department = request.json["department"]
    age_min = request.json["age_min"]
    age_max = request.json["age_max"]
    sex = request.json["sex"]
    smoke = request.json["smoke"]
    drink = request.json["drink"]
    disease = request.json["disease"]
    race = request.json["race"]
    date = request.json["dateTimeInputs"]


    date_string = ','.join(date)
    sex_string = ', '.join(sex)
    race_string = ', '.join(race)


    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO trials (researcher_id, department, description, location, age_min, age_max, sex, drink, smoke, diseases, race, title, compensation, duration, times) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    values = (current_user_id, department, description, location, age_min, age_max, sex_string, drink, smoke, disease, race_string, title, compensation, duration, date_string)
    # print(values)
    cursor.execute(query, values)
    conn.commit()  


    return jsonify({
        "id": current_user_id,
    })


if __name__ == '__main__':
    app.run(debug=True)  # Runs the application in debug mode
