from flask import Blueprint
from flask_cors import CORS

index = Blueprint('index', __name__)
CORS(index)
from app.controller.index import routes