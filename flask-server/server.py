from flask import Flask,request
import database as db

app = Flask(__name__)

# Members API Route
@app.route("/artworks",methods=["GET"])
def get_artworks():
    """ db.clear_database()
    db.create_artwork_table()
    db.create_categories_table() """
    category_id = request.args.get('category_id')
    result = db.get_all_artworks(category_id)
    return result

@app.route("/categories",methods=["GET"])
def get_categories():
    result = db.get_all_categories()
    return result

@app.route("/update-artwork",methods=["GET","POST"],strict_slashes=False)
def update_artwork():
    category_id = request.args.get('category_id')
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
    result = db.get_all_artworks(category_id)
    return result

@app.route("/add-empty-artwork",methods=["GET","POST"],strict_slashes=False)
def add_empty_artwork():
    category_id = request.args.get('category_id')
    db.insert_empty_artwork(category_id)
    result = db.get_all_artworks(category_id)
    return result  

@app.route("/remove-artwork",methods=["GET","POST"],strict_slashes=False)
def remove_artwork():
    category_id = request.args.get('category_id')
    id = request.json['id']
    print(id)
    db.remove_artwork(id)
    result = db.get_all_artworks(category_id)
    return result

@app.route("/update-position",methods=["GET","POST"],strict_slashes=False)
def update_position():
    category_id = request.args.get('category_id')
    id1 = request.json['id1']
    position1 = request.json['position1']
    id2 = request.json['id2']
    position2 = request.json['position2']
    db.update_position(id1,position1,id2,position2)
    result = db.get_all_artworks(category_id)
    return result

@app.route("/add-empty-category",methods=["GET","POST"],strict_slashes=False)
def add_empty_category():
    category_id = request.args.get('category_id')
    db.insert_empty_category()
    result = db.get_all_categories()
    return result  

@app.route("/remove-category",methods=["GET","POST"],strict_slashes=False)
def remove_category():
    id = request.json['id']
    db.remove_category(id)
    result = db.get_all_categories()
    return result

@app.route("/update-category",methods=["GET","POST"],strict_slashes=False)
def update_category():
    id = request.json['id']
    name = request.json['name']
    db.update_category(id,name)
    result = db.get_all_categories()
    return result

if __name__ == "__main__":
    app.run(debug=True)