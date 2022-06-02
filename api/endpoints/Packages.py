import os
from controllers.packages_controller import PackagesController
from flask_restx import Namespace, Resource, fields

packages_controller = PackagesController()

api = Namespace('packages', description='Operations related with packages')

package_connection = api.model('To collect data', {
    "ip": fields.String(description='Device ip'),
    "interface": fields.String(description='Device ip'),
    "ip2": fields.String(description='Device ip 2'),
    "interface2": fields.String(description='Device ip 2'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
})

@api.route('/')
@api.response(404, 'Router not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class Data(Resource):
    @api.doc('Get data')
    @api.expect(package_connection)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'interface': req['interface'], 'ip2': req['ip2'], 'interface2': req['interface2'], 'user': req['admin'], 'password': req['adminPass']}
            success, response = packages_controller.getInterfacesCounters(config['ip'], config['user'], config['password'], config['interface'], config['ip2'], config['interface2'])
            if response and success:
                return {'msg': response}, 200
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

