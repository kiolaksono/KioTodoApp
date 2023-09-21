from flask import flash, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity

from app.models.model import Users, BlacklistToken
from app.controller.auth import auth
from app.extensions import db, jwt

@auth.route('/login', methods=['POST'])
def login():
        dataLogin = request.get_json()
        
        usernameLogin = dataLogin.get('username', None)
        passwordLogin = dataLogin.get('password', None)
    
        usercheck = Users.query.filter_by(username = usernameLogin).first()
        print(Users.id)
        if not usercheck or not check_password_hash(usercheck.password, passwordLogin) :
            return jsonify(
                message = "username or password invalid"
            ), 422
        else:
            access_token = create_access_token(identity=usercheck.id)
            refresh_token = create_refresh_token(identity=usercheck.id)

        return jsonify({
            "message":"Berhasil login",
            "access_token" : access_token,
            "refresh_token": refresh_token
            }), 200


@auth.route('/refresh', methods=['POST'])
@jwt_required(locations=['headers'])
def refresh():
    # berfungsi untuk memperbarui token yang sudah kadaluarsa
    current_user = get_jwt_identity()
    refresh_token = create_refresh_token(identity=current_user)
    response = jsonify(
        success = True,
        access_token = refresh_token
    )
    
    return response, 200

@auth.route('/signup', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email_reg')
        firstname = request.form.get('firstname_reg')
        lastname = request.form.get('lastname_reg')
        username = request.form.get('username_reg')
        password = request.form.get('password_reg')
        
        # checking apakah akun sudah ada atau belum
        
        # emailCheck = Users.query.filter_by(email=email).first()
        # usernameCheck = Users.query.filter_by(username=username).first()
        
        
        # if emailCheck:
        #     flash('Email already exists.', category='error')
        # elif usernameCheck:
        #     flash('Username already exists.', category='error')
        if len(email) < 4:
            flash('Email must be greater than 4 characters.', category='error')
        elif len(firstname) < 3:
            flash('Please, input your first name correctly', category = 'error')
        elif len(lastname) < 1:
            flash('Please put "." if you dont have last name', category='error')
        elif len(username) <5:
            flash('Username must be 5-12 Characters', category='error')
        elif len(password) <6:
            flash('Password must be greater than 8 characters', category='error')
        else:
            new_user = Users(email = email, firstname = firstname, lastname = lastname, username=username, password=generate_password_hash(password, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            flash('Account Created', category='success')
    return render_template('/auth/registration.html')    

@auth.route("/logout", methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def logout():
    """
    Fungsi untuk logout

    args:
        -

    return
        response (json object): pesan response
    """
    # mendapatkan token jwt
    raw_jwt = get_jwt()
    print(raw_jwt)

    # menambahkan token jwt ke blacklist
    # mencabut JWT dan menolak akses ke permintaan di masa mendatang
    jti = raw_jwt.get('jti')
    token = BlacklistToken(jti = jti)
    
    
    db.session.add(token)
    db.session.commit()
    return jsonify(message = "logout successfully")

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    
    #checking apakah token sudah pernah digunakan atau tidak
    
    jti = jwt_payload["jti"]
    token = BlacklistToken.query.filter_by(jti=jti).first()
    return token is not None