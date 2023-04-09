import sqlite3
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


@app.route("/add", methods=["GET"])
def add():
    name = request.args.get("name").split(" ", 1)
    number = request.args.get("number")

    if len(name) == 2:
        Fname = name[0]
        Lname = name[1]
    else:
        Fname = name[0]
        Lname = ""

    con = sqlite3.connect("Contacts.db")
    cur = con.cursor()

    cur.execute("INSERT INTO CONTACTS VALUES(?, ?, ?)", (Fname, Lname, number))
    con.commit()
    con.close()

    return str("ALL GOOD")

@app.route("/search", methods=["GET"])
def search():
    q = request.args.get("q")
    con = sqlite3.connect("Contacts.db")
    cur = con.cursor()

    cur.execute(f'SELECT * FROM CONTACTS WHERE FName || " " || Lname LIKE "%{q}%" ORDER BY Fname, Lname')
    output = cur.fetchall()
    con.close()

    data = {}

    for i, info in enumerate(output):
        data[i] = {"name":info[0]+" "+info[1], "no":info[2]}

    return jsonify(data)


@app.route("/")
def home():
    return render_template("home.html")

if __name__=="__main__":
    app.run(host="0.0.0.0")
