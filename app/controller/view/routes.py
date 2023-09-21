from flask import request, jsonify, flash, json
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controller.view import views
from app.extensions import db
from app.models.model import Tasks, Projects

@views.route('', methods=['GET'], strict_slashes = False)
@jwt_required(locations = ['headers'])
def get_all_task():

    
    current_user = get_jwt_identity()
    print(current_user)
    
    taskChecking = db.session.execute(
        db.select(Tasks)
        ).scalars()
    
    

    #mengubah object tasks menjadi dictionary
    result = []
    for tweet in taskChecking:
        if tweet.user_id == current_user:
            result.append(tweet.serialize())
        

    response = jsonify(
        success = True,
        data = result
    )
    return response, 200
    
    # query untuk mendapatkan task
              
 
@views.route('<int:id>', methods=['GET'], strict_slashes=False)
@jwt_required(locations=['headers'])
def get_one_task(id):
    
    # fungsi untuk mendapatkan task berdasarkan id

    # mendapatkan task berdasarkan id
    tasks = Tasks.query.filter_by(user_id=id).first()
    
    # mendapatkan task dalam bentuk dictionary
    tasks = tasks.serialize()
    
    response = jsonify(
        success = True,
        data = tasks
    )
    
    return response, 200

@views.route('', methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def create_task():
    
    
    
    # membuat task baru
    
    # mendapatkan request json dari client
    dataCreate = request.get_json()
    title_task = dataCreate.get("title_task")
    desc_task = dataCreate.get("desc_task")
    project_id = dataCreate.get("project_id")
    user_id = get_jwt_identity()
    

    # menambahkan task baru
    new_task = Tasks(title = title_task,
                     desc = desc_task,
                     project_id = project_id,
                     user_id = user_id)
    
    # menambahkan data ke database
    db.session.add(new_task)
    db.session.commit()

    return jsonify(dataCreate = new_task.serialize()), 200

@views.route('<int:id>', methods=['PUT'], strict_slashes = False)
@jwt_required(locations=['headers'])
def edit_task(id):
    
    # fungsi untuk melakukan edit task
    
    # mendapatkan current user
    current_user = get_jwt_identity()
    
    # mendapatkan user yang create task
    task = Tasks.query.filter_by(project_id=id).first()
    
    # if current_user != task.user_id :
    #     flash('You don\'t have permission to edit this task')
    #     return jsonify(), 403
    
    # mendapatkan request json dari client
    dataEdit = request.get_json()
    titleEdit = dataEdit.get("title_task")
    descEdit = dataEdit.get("desc_task")
    
    if not titleEdit :
        flash('Title Task can\'t be empty')
    else:
        #melakukan overwrite / update data
        task.title = titleEdit
        task.desc = descEdit
    
    db.session.commit()
    return jsonify(), 200

@views.route('/status/<int:id_task>', methods=['PUT'], strict_slashes = False)
@jwt_required(locations=['headers'])
def update_status_task(id_task):
    
    # fungsi untuk melakukan update status task
    
    # mendapatkan current user
    current_user = get_jwt_identity()
    
    # mendapatkan user yang create task
    task = Tasks.query.filter_by(id_task=id_task).first()
    
    if current_user != task.user_id :
        flash('You don\'t have permission to edit this task')
        return jsonify(message = 'You cant edit this task'), 403
    
    # mendapatkan request json dari client
    dataStatus = request.get_json()
    statusUpdate = dataStatus.get("status")
    
    # melakukan update status / overwrite
    task.status = statusUpdate
    
    db.session.commit()
    return jsonify(), 200



@views.route('/delete-note', methods=['POST'])
# @jwt_required(locations=['headers'])
def delete_task():
    task = json.loads(request.data)
    taskId = task['taskId']
    task = Tasks.query.get(taskId)
    
    if task: 
        db.session.delete(task)
        db.session.commit()
    else:
        flash('You don\'t have permission to delete this task')

    return jsonify({})