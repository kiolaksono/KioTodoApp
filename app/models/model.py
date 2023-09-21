from app.extensions import db
from flask_login import UserMixin

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(25), unique=True)
    password = db.Column(db.String(1024))
    email = db.Column(db.String(125), nullable=False)
    firstname = db.Column(db.String(125), nullable=False)
    lastname = db.Column(db.String(125), nullable=False)
    # untuk menghubungkan dengan table Tasks
    user_to_project = db.relationship('Projects', back_populates='project_to_user')
    user_to_task = db.relationship('Tasks', back_populates='task_to_user')
    
    #digunakan untuk mengubah data yang berbentuk table menjadi JSON
    def serialize(self):
        return{
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "email" : self.email,
            "firstname" : self.firstname,
            "lastname" : self.lastname,
            
        }
    
class Tasks(db.Model):
    id_task = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(10000), nullable=False)
    desc = db.Column(db.String(1000))
    status = db.Column(db.Boolean, default=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id_project'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    task_to_project = db.relationship('Projects', back_populates = 'project_to_task')
    task_to_user = db.relationship('Users', back_populates = 'user_to_task')
    
    
    def serialize(self):
        return{
            "id_task": self.id_task,
            "title_task": self.title,
            "desc_task": self.desc,
            "status_task" : self.status,
            "project_id" : self.project_id,
            "user_id" : self.user_id
        }
        
class Projects(db.Model):
    id_project = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String(10000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    
    project_to_user = db.relationship('Users', back_populates = 'user_to_project')
    project_to_task = db.relationship('Tasks', back_populates = 'task_to_project')
    
    def serialize(self):
        return{
            "id_project": self.id_project,
            "project_name": self.project_name,
            "user_id": self.user_id
        }
        
class BlacklistToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    
    def serialize(self): 
        return {
            "id": self.id,
            "jti": self.jti,
        }