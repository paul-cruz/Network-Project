import os
import pymongo
from Crypto.Hash import SHA256
from bson.objectid import ObjectId
from pymongo.collection import ReturnDocument
from flask_restplus import Namespace, Resource, fields

myclient = pymongo.MongoClient(os.getenv("DB_CONN"))
db = myclient[os.getenv("DB_NAME")]
app_users_col = db["app_users"]
api = Namespace('app_users', description='app users related operations')

app_user = api.model('APP_USER', {
    "username": fields.String(description='App Username'),
    "password": fields.String(description='hashed password')
})


@api.route('/')
@api.response(404, 'User not inserted')
@api.response(500, 'Server Error')
class Users(Resource):
    @api.doc('post_app_users')
    @api.expect(app_user)
    def post(self):
        try:
            request = api.payload
            hash = SHA256.new()
            hash.update(request["password"].encode())
            request["password"] = hash.hexdigest()
            print(request)
            result_id = app_users_col.insert_one(api.payload).inserted_id
            if result_id:
                return {'msg': 'Inserted'}, 201
            raise ValueError('app_users not found')
        except ValueError as ve:
            print('app_users exception', ve)
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)


@api.route('/<id>')
@api.param('id', 'The user identifier')
@api.response(404, 'User not found')
@api.response(500, 'Server Error')
class User(Resource):
    @api.doc('get_app_users')
    def get(self, id):
        try:
            result = app_users_col.find_one({'_id': ObjectId(id)})
            if result:
                return result
            raise ValueError('app_users not found')
        except ValueError as ve:
            print('app_users exception', ve)
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

    @api.doc('put_app_users')
    @api.expect(app_user)
    def put(self, id):
        try:
            doc = api.payload
            result = app_users_col.find_one_and_update(
                {'_id': ObjectId(id)},
                {'$set': doc},
                return_document=ReturnDocument.AFTER)
            if result:
                return {'msg': 'Updated'}, 200
            raise ValueError('app_users not found')
        except ValueError as ve:
            print('app_users exception', ve)
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

    @api.doc('delete_app_users')
    def delete(self, id):
        try:
            result = app_users_col.find_one_and_delete({'_id': ObjectId(id)})
            if result:
                return {'msg': 'Deleted'}, 200
            raise ValueError('app_users not found')
        except ValueError as ve:
            print('app_users exception', ve)
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)


@api.route('/login/')
@api.response(404, 'User not inserted')
@api.response(500, 'Server Error')
class UserLogin(Resource):
    @api.doc('login_app_users')
    @api.expect(app_user)
    def post(self):
        try:
            request = api.payload
            hash = SHA256.new()
            hash.update(request["password"].encode())
            result = app_users_col.find_one(
                {'username': request["username"]})
            if result:
                print(result)
                return result["password"] == hash.hexdigest()
            raise ValueError('app_users not found')
        except ValueError as ve:
            print('app_users exception', ve)
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)
