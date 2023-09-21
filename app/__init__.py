from flask import Flask
from config import Config
from app.extensions import db, migrate, jwt

#import blueprint
from app.controller.auth import auth
from app.controller.view import views
from app.controller.index import index
from app.controller.project import projects


def create_app(config_class = Config()):
    app = Flask(__name__)
    
    app.config.from_object(config_class)
    
    
    db.init_app(app) #menginisiasi database
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # with app.app_context():
    #     db.create_all()
    
    
    # end point API
    app.register_blueprint(views, url_prefix='/api/views')
    app.register_blueprint(auth, url_prefix='/api/auth')
    app.register_blueprint(projects, url_prefix='/api/projects')
    
    app.register_blueprint(index, url_prefix='/')

    
    return app
