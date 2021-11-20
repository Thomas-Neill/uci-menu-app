import requests
import bs4
import sqlite3 as sl
import datetime
import pickle
import re
import os


URL = "https://uci.campusdish.com/LocationsAndMenus/{TheAnteatery}?locationId=3056&storeIds=&mode=Daily&periodId=2651&date=11%2F5%2F2021"
ADDRESS = "https://uci.campusdish.com/LocationsAndMenus/"
Locations = ["Brandywine","TheAnteatery"]

Periods = {107:'dinner',49:'breakfast',2651:'brunch',106:'lunch'}

def grab(location,date,period):
    URL = f"https://uci.campusdish.com/LocationsAndMenus/{location}?locationId=3056&storeIds=&mode=Daily&periodId={period}&date={date.replace('/','%2F')}"
    return bs4.BeautifulSoup(requests.get(URL).text,features="html.parser")

clean = lambda name: name.encode("ascii", "ignore").decode().replace("'","")

class MenuItem:
    def __init__(self,soup):
        n = soup.find(class_="item__name")
        if n.find(class_="viewItem"):
            self.name = n.find(class_="viewItem").string
        else:
            self.name = n.string
        self.name = clean(self.name)

        #self.name = re.sub(r'[^\x00-\x7F]+',' ', self.name)

        ical = soup.find(class_="item__calories")
        self.calories = ical and int(re.sub('[^\d]','',ical.string))
        ic = soup.find(class_="item__content")
        self.blurb = ic and clean(ic.string)

        self.vege = eval(soup["isvegetarian"])
        self.vega = eval(soup["isvegan"])

        


def read(location,date,meal):
    grabbed = grab(location,date,meal)

    dat = grabbed.find_all(class_=["menu__item","categoryName"])

    data = []

    foodtype = None

    for i in dat:
        if "menu__item" in i["class"]:
            data.append(MenuItem(i))
            data[-1].foodtype = foodtype
        else:
            foodtype = clean(i.string.replace('é','e'))
    return data


def meals(day):
    if day.weekday() >= 5:
        return [107,2651,49]
    return [107,106,49]

DATA = {}

os.remove('menu.db')
con = sl.connect('menu.db')
con.execute('''CREATE TABLE menu 
    (date text,area text, foodtype text,meal int, name text, calories int, blurb text, vege bool,vega bool)
''')

cur = con.cursor()

d = datetime.date.today()
for i in range(4): #read the next 4 days
    for l in Locations:
        for m in meals(d):
            dat = read(l,str(d),m)
            print("fetched: ",str(d),l,m)
            for i in dat:
                #print(f"INSERT INTO menu VALUES ('{str(d)}','{l}',{m},'{i.foodtype}','{i.name}','{i.calories}','{i.blurb}',{i.vege})")
                cur.execute(f"INSERT INTO menu VALUES ('{str(d)}','{l}','{i.foodtype}',{m},'{i.name}',{i.calories or 1000},'{i.blurb}',{i.vege},{i.vega})")
    d += datetime.timedelta(days=1)

con.commit()

print(f"Fetched {len(list(cur.execute('SELECT * FROM menu')))} values")

