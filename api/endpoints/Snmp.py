import os
from controllers.snmp_controller import SNMPController
from flask_restplus import Namespace, Resource, fields
from pysnmp import hlapi

snmp_controller = SNMPController()

api = Namespace('SNMP', description='Operations related with SNMP')

@api.route('/')
@api.response(404, 'Router not found')
@api.response(409, 'Error from the device')
@api.response(500, 'Server Error')
class ActivateRSA(Resource):
    @api.doc('Get data of MIB')
    def post(self):
        try:
            req = api.payload
            #config = {'ip': req['ip'], 'user': req['admin'], 'password': req['adminPass']}
            response = snmp_controller.get('192.168.10.254', ['1.3.6.1.2.1.1.5.0', '1.3.6.1.2.1.1.6.0', '1.3.6.1.2.1.1.4.0', '1.3.6.1.2.1.1.1.0'], hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol))
            if response:
                return {'msg': response}, 200
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

