from flask import Blueprint

projects = Blueprint('projects', __name__)

from app.controller.project import routes