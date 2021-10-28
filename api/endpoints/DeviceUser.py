import os
from api.controllers.user_controller import UserController
import pymongo
from Crypto.Hash import SHA256
from pymongo.collection import ReturnDocument
from flask_restplus import Namespace, Resource, fields

myclient = pymongo.MongoClient(os.getenv("DB_CONN"))
db = myclient[os.getenv("DB_NAME")]
app_users_col = db["device_user"]
app_users_col.create_index("username", unique=True)

user_controller = UserController()

api = Namespace('device_user', description='app users related operations')

device_user = api.model('DEVICE_USER_CREATION', {
    "ip": fields.String(description='Device ip'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
    "username": fields.String(description='Username in device'),
    "password": fields.String(description='Password of the user in device'),
})


@api.response(404, 'User not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class UserCreation(Resource):
    @api.doc('get_app_users')
    @api.expect(device_user)
    def post(self):
        try:
            req = api.payload
            new_user = {'username': req['username']}
            result_id = app_users_col.insert_one(new_user).inserted_id
            success, resp = user_controller.createUser(
                req['ip'], req['admin'], req['adminPass'], req['username'], req['password'])
            if result_id and success:
                return {'msg': 'Created'}, 201
            else:
                return resp, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

    @api.doc('put_app_users')
    @api.expect(device_user)
    def put(self):
        try:
            req = api.payload
            success, resp = user_controller.updateUser(
                req['ip'], req['username'], req['password'], req['newPassword'])
            if success:
                return {'msg': 'Updated'}, 201
            else:
                return resp, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

    @api.doc('delete_app_users')
    def delete(self):
        try:
            req = api.payload
            result = app_users_col.find_one_and_delete(
                {'username': req['username']})
            success, resp = user_controller.deleteUser(
                req['ip'], req['username'], req['password'])
            if result and success:
                return {'msg': 'Deleted'}, 201
            else:
                return resp, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)
