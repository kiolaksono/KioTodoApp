from flask import Blueprint
from werkzeug.exceptions import abort

views = Blueprint('view', __name__)

from app.controller.view import routes