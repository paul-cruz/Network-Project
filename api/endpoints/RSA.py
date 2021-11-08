import os
from controllers.RSA_controller import RSAController
from flask_restplus import Namespace, Resource, fields

RSA_controller = RSAController()

api = Namespace('RSA', description='Operations related with RSA')

rsa_connection = api.model('RIP Protocol configuration', {
    "ip": fields.String(description='Device ip'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
})

@api.route('/activate')
@api.response(404, 'Router not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class ActivateRSA(Resource):
    @api.doc('activate_RSA')
    @api.expect(rsa_connection)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass']}
            success, response = RSA_controller.addRSASupport(config['ip'], config['user'], config['password'])
            if response and success:
                return {'msg': response["response"]}, 200
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

