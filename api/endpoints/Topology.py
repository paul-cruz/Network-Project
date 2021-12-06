from controllers.main_controller import DeviceController
from flask_restplus import Namespace, Resource, fields
import traceback

device_controller = DeviceController()

api = Namespace('topology', description='Operations related with topology')

device_connection = api.model('Device data', {
    "ip": fields.String(description='Device ip'),
    "name": fields.String(description='Device name'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
})

@api.route('/')
@api.response(404, 'Router not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class getTopology(Resource):
    @api.doc('Get topology')
    @api.expect(device_connection)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass'], 'name': req['name']}
            success, ips, routers_names = device_controller.getTopology(config['ip'], config['name'], config['user'], config['password'])
            if ips and success:
                return {'ips': ips, 'names': routers_names}, 200
            else:
                return 'Error', 409
        except ValueError as ve:
            print(traceback.format_exc())
            print('Server Error', ve)
            api.abort(404)
        except Exception as e:
            print(traceback.format_exc())
            print('Server Error', e)
            api.abort(500)

