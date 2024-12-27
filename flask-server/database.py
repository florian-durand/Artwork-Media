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
    create_artwork_table()
    create_categories_table()


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

def get_all_artworks(category_id) :
    print(category_id)
    return query_db("SELECT * FROM Artworks WHERE CategoryId = ? ORDER BY Position",[category_id] )

def remove_artwork(id) :
    query_db("DELETE FROM Artworks WHERE Id = ?",[id])

def insert_empty_artwork(category_id) :
    max_pos = query_db("SELECT MAX(Position) FROM Artworks WHERE CategoryId = ?",[category_id])[0][0]
    if max_pos != None :
        max_pos += 1
    else :
        max_pos = 0
    query_db("INSERT INTO Artworks (Title,Description,Image_path,Link,Position,CategoryId) values(?,?,?,?,?,?)",["Title","Fill the description","images/question.jpg","",max_pos,category_id])

def create_categories_table() :
    query_db("CREATE TABLE Categories (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT)")
    query_db("INSERT INTO Categories (Id,Name) values(?,?)",[1,"Cool things"])

def update_position(id,newPosition,newCategory):
    artwork = query_db("SELECT Position, CategoryId FROM Artworks WHERE Id = ?",[id])
    query_db("UPDATE Artworks SET Position = Position-1 WHERE Position > ? AND CategoryId = ?",[artwork[0][0],artwork[0][1]])
    query_db("UPDATE Artworks SET Position = Position+1 WHERE Position >= ? AND CategoryId = ?",[newPosition,newCategory])
    query_db("UPDATE Artworks SET Position = ?,CategoryId = ? WHERE Id = ?",[newPosition,newCategory,id])

def get_all_categories() :
    return query_db("SELECT * FROM Categories")

def insert_empty_category() :
    query_db("INSERT INTO Categories (name) values(?)",["New Category"])

def remove_category(id) :
    query_db("DELETE FROM Artworks WHERE CategoryId = ?",[id])
    query_db("DELETE FROM Categories WHERE Id = ?",[id])

def update_category(id,name) :
    query_db("UPDATE Categories SET Name = ? WHERE Id = ?",[name,id])

def get_all_artworks_by_category() :
    categories = query_db("SELECT * FROM Categories")
    result = []
    for category in categories :
        id = category[0]
        name = category[1]
        artworks = query_db("SELECT * from  Artworks WHERE CategoryId = ? ORDER BY Position",[id])
        result.append([id,name,artworks])
    return result