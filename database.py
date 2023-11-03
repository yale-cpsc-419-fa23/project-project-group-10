import sqlite3
from sqlite3 import connect
from contextlib import closing
import sys
from sqlite3 import connect, Error
from werkzeug.security import check_password_hash, generate_password_hash
from sys import stderr

_DATABASE_URL = "labrats.db"

def login_user(email, password):
    # if not email or not password:
    #     return

     with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:

            query = "SELECT * FROM users WHERE email = ? AND password = ?"
            cursor.execute(query, (email, password))
            row = cursor.fetchall()
            return row


            # if not row:
            #     raise Exception("error")
            # else:
            #     return row #in app you will only get result if everything is correct

    

