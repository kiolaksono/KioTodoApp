# extensions.py berfungsi untuk menampung library-library pihak ketiga

from flask_sqlalchemy import SQLAlchemy

#berfungsi untuk melakukan perubahan terhadap table yang ada
from flask_migrate import Migrate 

from flask_jwt_extended import JWTManager


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()