import sqlite3
from flask import Flask

DATABASE = "../database/database.db"

def get_db():
    db = getattr(Flask, '_database', None)
    if db is None:
        db = Flask._database = sqlite3.connect(DATABASE)
    return db

def close_connection():
    db = getattr(Flask, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def clear_database() :
    query_db("DROP TABLE IF EXISTS Users")
    query_db("DROP TABLE IF EXISTS Artworks")

def create_user_table() :
    query_db("CREATE TABLE Users (Login VARCHAR(255) PRIMARY KEY, Password VARCHAR(255))")

def insert_user(login,password):
    query_db("INSERT INTO Users (Login,Password) values(?,?)",[login,password])

def create_artwork_table():
    query_db("CREATE TABLE Artworks (Title VARCHAR(255) PRIMARY KEY, Description TEXT,Image_path TEXT)")
    query_db("INSERT INTO Artworks (Title,Description,Image_path) values(?,?,?)",["Title","Add a description","images/question.jpg"])
    query_db("INSERT INTO Artworks (Title,Description,Image_path) values(?,?,?)",["Title2","Add a description","images/question.jpg"])
    
def insert_artwork(title, description, imagePath) :
    query_db("INSERT INTO Artworks (Title,Description,Image_path) values(?,?,?)",[title,description,imagePath])

def get_all_artworks() :
    return query_db("SELECT * FROM Artworks")