import sqlite3
from flask import Flask

DATABASE = "../database/database.db"

def query_db(query, args=(), one=False):
    with sqlite3.connect(DATABASE) as db :
        cur = db.execute(query, args)
        rv = cur.fetchall()
    return (rv[0] if rv else None) if one else rv

def clear_database() :
    query_db("DROP TABLE IF EXISTS Users")
    query_db("DROP TABLE IF EXISTS Artworks")

def create_user_table() :
    query_db("CREATE TABLE Users (Login VARCHAR(255) PRIMARY KEY, Password VARCHAR(255))")

def insert_user(login,password):
    query_db("INSERT INTO Users (Login,Password) values(?,?)",[login,password])

def create_artwork_table():
    query_db("CREATE TABLE Artworks (Id INTEGER PRIMARY KEY AUTOINCREMENT,Title VARCHAR(255), Description TEXT,Image_path TEXT,Link TEXT)")
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link) values(?,?,?,?)",["Death Stranding","Nice game","images/deathStranding.jpg","https://en.wikipedia.org/wiki/Death_Stranding"])
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link) values(?,?,?,?)",["Gladiator","Awesome fights","images/gladiator.jpg","https://en.wikipedia.org/wiki/Gladiator_(2000_film)"])
    
def insert_artwork(title, description, imagePath, link) :
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link) values(?,?,?,?)",[title,description,imagePath,link])

def get_all_artworks() :
    return query_db("SELECT * FROM Artworks")

def remove_artwork(id) :
    query_db("DELETE FROM Artworks WHERE Id = ?",[id])

def insert_empty_artwork() :
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link) values(?,?,?,?)",["Title","Fill the description","images/question.jpg",""])