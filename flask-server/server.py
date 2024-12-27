from flask import Flask,request
import database as db

app = Flask(__name__)

@app.route("/categories",methods=["GET"])
def get_categories():
    """ db.clear_database() """
    result = db.get_all_artworks_by_category()
    return result

@app.route("/update-artwork",methods=["GET","POST"],strict_slashes=False)
def update_artwork():
    id = request.form['id']
    title = request.form['title']
    description = request.form['description']
    link = request.form['link']
    imagePath = request.form['imagePath']
    
    if("blob" in imagePath) :
        file = request.files['file']
        imagePath = f"images/{id}.{file.filename.split(".")[-1]}"
        file.save(f"../client/public/{imagePath}")
        
    db.update_artwork(id,title,description,imagePath,link)
    result = db.get_all_artworks_by_category()
    return result

@app.route("/add-empty-artwork",methods=["GET","POST"],strict_slashes=False)
def add_empty_artwork():
    id = request.json['id']
    db.insert_empty_artwork(id)
    result = db.get_all_artworks_by_category()
    return result  

@app.route("/remove-artwork",methods=["GET","POST"],strict_slashes=False)
def remove_artwork():
    id = request.json['artworkId']
    db.remove_artwork(id)
    result = db.get_all_artworks_by_category()
    return result

@app.route("/update-position",methods=["GET","POST"],strict_slashes=False)
def update_position():
    id = request.json['id']
    position = request.json['position']
    category = request.json['category']
    db.update_position(id,position,category)
    result = db.get_all_artworks_by_category()
    return result

@app.route("/add-empty-category",methods=["GET","POST"],strict_slashes=False)
def add_empty_category():
    category_id = request.args.get('category_id')
    db.insert_empty_category()
    result = db.get_all_artworks_by_category()
    return result  

@app.route("/remove-category",methods=["GET","POST"],strict_slashes=False)
def remove_category():
    id = request.json['id']
    db.remove_category(id)
    result = db.get_all_artworks_by_category()
    return result

@app.route("/update-category",methods=["GET","POST"],strict_slashes=False)
def update_category():
    id = request.json['id']
    name = request.json['name']
    db.update_category(id,name)
    result = db.get_all_artworks_by_category()
    return result

if __name__ == "__main__":
    app.run(debug=True)