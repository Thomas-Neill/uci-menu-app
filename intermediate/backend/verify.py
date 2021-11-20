from flask import Flask
from flask import request

app = Flask(__name__)

users = {}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/signup", methods=["POST"])
def signup():
    if (request.form["username"] and request.form["password"]):
        users[str(request.form["username"])] = str(request.form["password"])
        return "200: Success"
    else:
        return "400: Bad Request"

@app.route("/verify", methods=["POST"])
def verify():
    if (users[request.form['username']] != None):
        if (users[request.form['username']] == request.form['password']): 
            return "200: Success"
    return "403: Forbidden"

@app.route("/list")
def list():
    return users