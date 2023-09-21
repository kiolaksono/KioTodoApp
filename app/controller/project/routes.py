from flask import request, jsonify
from app.controller.project import projects
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.model import Projects, Tasks

@projects.route('', methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def create_project():
    
    # membuat task baru
    
    # mendapatkan request json dari client
    dataCreate = request.get_json()
    project_name = dataCreate.get("project_name")
    user_id = get_jwt_identity()

    # menambahkan task baru
    new_project = Projects(project_name = project_name,
                     user_id = user_id)
    
    # menambahkan data ke database
    db.session.add(new_project)
    db.session.commit()

    return jsonify(dataCreate = new_project.serialize()), 200

# get all project

@projects.route('', methods=['GET'], strict_slashes = False)
@jwt_required(locations=["headers"])
def get_all_project():
    current_user = get_jwt_identity()
    
    showData = db.session.execute(
        db.select(Projects)
    ).scalars()
    
    result = []
    for tweet in showData:
        if (tweet.user_id == current_user):
            result.append(tweet.serialize())
    
    response = jsonify(
        success = True,
        data = result
    )
    
    return response, 200

@projects.route('<int:id>', methods=['GET'], strict_slashes=False)
@jwt_required(locations=['headers'])
def get_one_project(id):
    selectProject = Projects.query.filter_by(user_id = id).first()
    selectProject = selectProject.serialize()
    x = selectProject['id_project']
    
    print(x)
    
    # task = Tasks.query.filter_by(project_id = x).first()
    # projectToTasks = task.serialize()
    
    
    response = jsonify(
        success = True,
        data = selectProject
        
    )
    
    return response, 200