CREATE TABLE participant_info (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    age INTEGER,
    sex VARCHAR(255),
    drink BOOLEAN,
    smoke BOOLEAN,
    diseases VARCHAR(255), race VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE researcher_info (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    lab_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lab_id) REFERENCES labs(id)
);
CREATE TABLE labs (
    id INTEGER PRIMARY KEY,
    pi_id INTEGER,
    about VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY (pi_id) REFERENCES users(id)
);
CREATE TABLE trials (
    id INTEGER PRIMARY KEY,
    researcher_id INTEGER,
    department VARCHAR(255),
    description VARCHAR(255),
    location VARCHAR(255),
    age_min INTEGER,
    age_max INTEGER, 
    sex VARCHAR(255),
    drink BOOLEAN,
    smoke BOOLEAN,
    diseases VARCHAR(255), race VARCHAR(255), title VARCHAR(255),
    FOREIGN KEY (researcher_id) REFERENCES users(id)
);
CREATE TABLE saved (
    user_id INTEGER,
    trial_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trial_id) REFERENCES trials(id)
);
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INTEGER
);