from flask import Flask,request
import database as db

app = Flask(__name__)

@app.route("/categories",methods=["GET"])
def get_categories():
    userLogin = request.args.get('userLogin')

    result = db.get_all_artworks_by_category(userLogin)
    if(db.does_user_exist(userLogin)[0][0]) :
        return result
    else :
        return ["Not Found"]

@app.route("/update-artwork",methods=["GET","POST"],strict_slashes=False)
def update_artwork():
    id = request.form['id']
    title = request.form['title']
    description = request.form['description']
    link = request.form['link']
    imagePath = request.form['imagePath']
    userLogin = request.form['userLogin']
    
    if("blob" in imagePath) :
        file = request.files['file']
        imagePath = f"images/{id}.{file.filename.split(".")[-1]}"
        file.save(f"../client/public/{imagePath}")
        
    db.update_artwork(id,title,description,imagePath,link)
    result = db.get_all_artworks_by_category(userLogin)
    return result

@app.route("/add-empty-artwork",methods=["GET","POST"],strict_slashes=False)
def add_empty_artwork():
    id = request.json['id']
    userLogin = request.json['userLogin']
    db.insert_empty_artwork(id)
    result = db.get_all_artworks_by_category(userLogin)
    return result  

@app.route("/remove-artwork",methods=["GET","POST"],strict_slashes=False)
def remove_artwork():
    id = request.json['artworkId']
    userLogin = request.json['userLogin']
    db.remove_artwork(id)
    result = db.get_all_artworks_by_category(userLogin)
    return result

@app.route("/update-position",methods=["GET","POST"],strict_slashes=False)
def update_position():
    id = request.json['id']
    position = request.json['position']
    category = request.json['category']
    userLogin = request.json['userLogin']
    db.update_position(id,position,category)
    result = db.get_all_artworks_by_category(userLogin)
    return result

@app.route("/add-empty-category",methods=["GET","POST"],strict_slashes=False)
def add_empty_category():
    userLogin = request.json['userLogin']
    db.insert_empty_category(userLogin)
    result = db.get_all_artworks_by_category(userLogin)
    return result  

@app.route("/remove-category",methods=["GET","POST"],strict_slashes=False)
def remove_category():
    id = request.json['id']
    userLogin = request.json['userLogin']
    db.remove_category(id)
    result = db.get_all_artworks_by_category(userLogin)
    return result

@app.route("/update-category",methods=["GET","POST"],strict_slashes=False)
def update_category():
    id = request.json['id']
    name = request.json['name']
    userLogin = request.json['userLogin']
    db.update_category(id,name)
    result = db.get_all_artworks_by_category(userLogin)
    return result

@app.route("/create-account",methods=["GET","POST"],strict_slashes=False)
def create_account():
    """ db.clear_database() """
    login = request.json['login']
    password = request.json['password']
    db.create_account(login,password)
    return ["SUCCESS"]

@app.route("/connect-user",methods=["GET","POST"],strict_slashes=False)
def coonect_user():
    login = request.json['login']
    password = request.json['password']
    result = db.connect_user(login,password)
    return [result]

if __name__ == "__main__":
    app.run(debug=True)