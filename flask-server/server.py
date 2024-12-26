from flask import Flask,request
import database as db

app = Flask(__name__)

# Members API Route
@app.route("/artworks")
def get_artworks():
    """ db.clear_database()
    db.create_artwork_table()
    db.create_categories_table() """
    result = db.get_all_artworks()
    return result

@app.route("/update-artwork",methods=["POST"],strict_slashes=False)
def update_artwork():
    
    id = request.form['id']
    title = request.form['title']
    description = request.form['description']
    link = request.form['link']
    file = request.files['file']
    imagePath = f"images/{id}.{file.filename.split(".")[-1]}"
    file.save(f"../client/public/{imagePath}")
    db.update_artwork(id,title,description,imagePath,link)
    result = db.get_all_artworks()
    return result

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

@app.route("/update-position",methods=["POST"],strict_slashes=False)
def update_position():
    id1 = request.json['id1']
    position1 = request.json['position1']
    id2 = request.json['id2']
    position2 = request.json['position2']
    db.update_position(id1,position1,id2,position2)
    result = db.get_all_artworks()
    return result

if __name__ == "__main__":
    app.run(debug=True)