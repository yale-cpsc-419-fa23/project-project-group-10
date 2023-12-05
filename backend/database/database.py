import sqlite3
from sqlite3 import connect
from contextlib import closing
import sys
from sqlite3 import connect, Error
from werkzeug.security import check_password_hash, generate_password_hash
from sys import stderr

_DATABASE_URL = "labrats.db"

def login_user(email, password):
     with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:

            query = "SELECT * FROM users WHERE email = ? AND password = ?"
            cursor.execute(query, (email, password))
            row = cursor.fetchall()
            print(row)
            return row

            # if not row:
            #     raise Exception("error")
            # else:
            #     return row #in app you will only get result if everything is correct

def get_trials(email, password):
     with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:

            query = "SELECT id, title, department FROM trials;"
            cursor.execute(query)
            row = cursor.fetchall()
            print(row)
            return row