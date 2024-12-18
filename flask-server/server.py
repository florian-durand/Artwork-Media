from flask import Flask
import database as db

app = Flask(__name__)

""" @app.teardown_appcontext
def close_connection(exception):
    database.close_connection() """

# Members API Route
@app.route("/artworks")
def get_artworks():
    db.clear_database()
    db.create_artwork_table()
    result = db.get_all_artworks()
    return result
    

if __name__ == "__main__":
    app.run(debug=True)