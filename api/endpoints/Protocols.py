import os
from controllers.protocols_controller import ProtocolsController
from flask_restx import Namespace, Resource, fields

protocols_controller = ProtocolsController()

api = Namespace('protocols', description='Methods to activate different protocols')

rip_protocol = api.model('RIP Protocol configuration', {
    "ip": fields.String(description='Device ip'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
})

ospf_protocol = api.model("OSPF protocol configuration", {
  "ip": fields.String(description='Device ip'),
  "admin": fields.String(description='admin username in device'),
  "adminPass": fields.String(description='admin password in device'),
  "wildcard": fields.String(description='The wildcard'),
  "area": fields.String(description='Area of ospf protocol'),
})

eigrp_protocol = api.model('EIGRP Protocol configuration', {
    "ip": fields.String(description='Device ip'),
    "admin": fields.String(description='admin username in device'),
    "adminPass": fields.String(description='admin password in device'),
})

@api.route('/rip')
@api.response(404, 'Protocol not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class ProtocolRIP(Resource):
    @api.doc('configure_RIP_protocol')
    @api.expect(rip_protocol)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass']}
            success, response = protocols_controller.activateRIP(config['ip'], config['user'], config['password'])
            if response and success:
                return {'msg': response["response"]}, 200
            else:
                print(response)
                return response, 409
        except ValueError as ve:
            print(ve)
            api.abort(404)
        except Exception as e:
            print(e)
            print('Server Error', e)
            api.abort(500)


@api.route('/ospf')
@api.response(404, 'Protocol not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class ProtocolOSPF(Resource):
    @api.doc('configure_OSPF_protocol')
    @api.expect(ospf_protocol)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass'], 'wildcard': req['wildcard'], "area": req['area'] }
            success, response = protocols_controller.activateOSPF(config['ip'], config['user'], config['password'], config['wildcard'], config['area'])
            if response and success:
                return {'msg': response["response"]}, 200
            else:
                print(response)
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)


@api.route('/eigrp')
@api.response(404, 'Protocol not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class ProtocolEIGRP(Resource):
    @api.doc('configure_EIGRP_protocol')
    @api.expect(eigrp_protocol)
    def post(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass']}
            success, response = protocols_controller.activateEIGRP(config['ip'], config['user'], config['password'])
            if response and success:
                return {'msg': response["response"]}, 200
            else:
                print(response)
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

            