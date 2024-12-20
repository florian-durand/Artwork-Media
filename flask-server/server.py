from flask import Flask,request
import database as db

app = Flask(__name__)

# Members API Route
@app.route("/artworks")
def get_artworks():
    db.clear_database()
    db.create_artwork_table()
    db.create_categories_table()
    result = db.get_all_artworks()
    return result

@app.route("/update-artwork",methods=["POST"],strict_slashes=False)
def update_artwork():
    id = request.json['id']
    title = request.json['title']
    description = request.json['description']
    imagePath = request.json['imagePath']
    link = request.json['link']
    db.update_artwork(id,title,description,imagePath,link)
    return ["Done"]

@app.route("/add-empty-artwork",methods=["POST"],strict_slashes=False)
def add_empty_artwork():
    db.insert_empty_artwork()
    result = db.get_all_artworks()
    return result  

@app.route("/remove-artwork",methods=["POST"],strict_slashes=False)
def remove_artwork():
    id = request.json['id']
    print(id)
    db.remove_artwork(id)
    result = db.get_all_artworks()
    return result  

if __name__ == "__main__":
    app.run(debug=True)