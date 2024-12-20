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
    query_db("DROP TABLE IF EXISTS Categories")

def create_user_table() :
    query_db("CREATE TABLE Users (Login VARCHAR(255) PRIMARY KEY, Password VARCHAR(255))")

def insert_user(login,password):
    query_db("INSERT INTO Users (Login,Password) values(?,?)",[login,password])

def create_artwork_table():
    query_db("CREATE TABLE Artworks (Id INTEGER PRIMARY KEY AUTOINCREMENT,Title VARCHAR(255), Description TEXT,Image_path TEXT,Link TEXT,Position INT,CategoryId INT)")
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link,Position,CategoryId) values(?,?,?,?,?,?)",["Death Stranding","Nice game","images/deathStranding.jpg","https://en.wikipedia.org/wiki/Death_Stranding",0,1])
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link,Position,CategoryId) values(?,?,?,?,?,?)",["Gladiator","Awesome fights","images/gladiator.jpg","https://en.wikipedia.org/wiki/Gladiator_(2000_film)",1,1])
    
def update_artwork(id,title,description,imagePath,link) :
    query_db("UPDATE Artworks SET Title = ? , Description = ?, Image_path = ?,Link = ? WHERE Id = ?",[title,description,imagePath,link,id])

def get_all_artworks() :
    return query_db("SELECT * FROM Artworks ORDER BY Position")

def remove_artwork(id) :
    query_db("DELETE FROM Artworks WHERE Id = ?",[id])

def insert_empty_artwork() :
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link) values(?,?,?,?)",["Title","Fill the description","images/question.jpg",""])

def create_categories_table() :
    query_db("CREATE TABLE Categories (Id INTEGER PRIMARY KEY AUTOINCREMENT,NAME TEXT)")
    query_db("INSERT INTO Categories (Id,Name) values(?,?)",[1,"Cool things"])

def update_position(id1,position1,id2,position2):
    query_db("UPDATE Artworks SET Position = ? WHERE Id = ?",[position2,id1])
    query_db("UPDATE Artworks SET Position = ? WHERE Id = ?",[position1,id2])