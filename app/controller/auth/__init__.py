from flask import Blueprint
from flask_cors import CORS

auth = Blueprint('auth', __name__)
CORS(auth)

from app.controller.auth import routes


