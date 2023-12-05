import sqlite3
from sqlite3 import connect
from contextlib import closing
import sys
from sqlite3 import connect, Error
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

def feed_view():
    with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:
            
            query = "SELECT id, title, department FROM trials;"
            cursor.execute(query)
            row = cursor.fetchall()
            return row
        
def feed_view_filtered(filterterms):
    with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:

            # age
            # sex
            # search terms in title and description
            
            query = "SELECT id, title, department FROM trials "
            query += filterterms
            query += ";"
            cursor.execute(query)
            row = cursor.fetchall()
            return row

def details(id):
    with connect(_DATABASE_URL, uri=True) as connection:
        with closing(connection.cursor()) as cursor:
            
            query = "SELECT * FROM trials FROM trials WHERE id = ?"
            cursor.execute(query, (id))
            row = cursor.fetchall()
            return row
