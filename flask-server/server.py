from flask import Flask,request
import database as db

app = Flask(__name__)

# Members API Route
@app.route("/artworks")
def get_artworks():
    db.clear_database()
    db.create_artwork_table()
    result = db.get_all_artworks()
    return result

@app.route("/update-artwork",methods=["POST"],strict_slashes=False)
def update_artwork():
    id = request.json['id']
    title = request.json['title']
    description = request.json['description']
    imagePath = request.json['imagePath']
    link = request.json['link']
    db.remove_artwork(id)
    db.insert_artwork(title,description,imagePath,link)
    return ["Done"]

@app.route("/add-empty-artwork",methods=["POST"],strict_slashes=False)
def add_empty_artwork():
    db.insert_empty_artwork()
    return ["Done"]    

if __name__ == "__main__":
    app.run(debug=True)