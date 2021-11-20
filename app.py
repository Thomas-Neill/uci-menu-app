from flask import Flask
from flask import request
from flask.templating import render_template
from flask_cors import CORS
import sqlite3 as sl
import datetime

app = Flask(__name__)
CORS(app)


waitingOthers = []

@app.route("/",methods=['GET'])
def hi():
    return {'pog':True}

@app.route("/search/",methods=['GET'])
def search():
    conn = sl.connect('menu.db')
    cur = conn.cursor()
    #print('searched')
    place = request.args.get('place')
    keyword = request.args.get('keyword')
    foodtype = request.args.get('types')
    cals = request.args.get('calories')
    vegan = request.args.get('vegan')
    vege = request.args.get('vegetarian')
    meal = request.args.get('meal')

    query = "SELECT * FROM menu"

    constraints = [f"date='{datetime.date.today()}'"]

    if cals != '-1':
        constraints.append(f"calories<{cals}")
    if vegan != "false":
        constraints.append(f"vega=1")
    if vege != "false":
        constraints.append(f"vege=1")
    mealMap = {'dinner':107,'breakfast':49,'brunch':2651,'lunch':106}
    Periods = {107:'dinner',49:'breakfast',2651:'brunch',106:'lunch'}
    if meal:
        constraints.append(f"meal={mealMap[meal]}")
    if keyword != "":
        constraints.append(f"name LIKE '%{keyword}%'")
    if foodtype != "":
        constraints.append(f"foodtype LIKE '%{foodtype}%'")
    if place != "":
        constraints.append(f"area LIKE '%{place}%'")
    
    query = query + " WHERE " + " AND ".join(constraints) #no sql injection plz (;_;)
    #print(query)

    res = {"body":[]}
    for i in cur.execute(query):
        res['body'].append({
            'date': i[0],
            'area': i[1],
            'station': i[2],
            'meal': Periods[int(i[3])],
            'name': i[4],
            'calories': i[5],
            'blurb': i[6],
            'vege': i[7],
            'vega':i[8]
        })
    return res



