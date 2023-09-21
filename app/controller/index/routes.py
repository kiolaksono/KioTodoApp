from app.controller.index import index
from flask import render_template, redirect, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity

@index.route("", strict_slashes =False)
def home():
    return render_template("/views/home.html")

@index.route("/login", strict_slashes =False)
def login():
    return render_template("/auth/login.html")

@index.route("/registration", strict_slashes =False)
def register():
    return render_template("/auth/registration.html")