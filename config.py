import os
from datetime import timedelta

# mengambil absolute url dari flaskapp
basedir = os.path.abspath(os.path.dirname(__file__))

#konfigurasi path database
DB_PATH = 'sqlite:///' + os.path.join(basedir, 'app.db')

class Config:
    SECRET_KEY = 'throwthedice'
    SQLALCHEMY_DATABASE_URI = DB_PATH
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_SECRET_KEY = "super-secret"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days = 30)