from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/signup", methods=["POST"])
def signup():
    if (request.form["username"] and request.form["password"]):
        users[str(request.form["username"])] = str(request.form["password"])
        return "200"
    else:
        return "400"

@app.route("/verify", methods=["POST"])
def verify():
    if (users[request.form['username']] != None):
        if (users[request.form['username']] == request.form['password']): 
            return "200"
    return "403"

@app.route("/list")
def list():
    return users