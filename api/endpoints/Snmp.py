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
            print(req['ip'])
            if(req['ip']):
                response = snmp_controller.get(req['ip'], ['1.3.6.1.2.1.1.5.0', '1.3.6.1.2.1.1.6.0', '1.3.6.1.2.1.1.4.0', '1.3.6.1.2.1.1.1.0'], hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol))
                if response:
                    return {'msg': response}, 200
                else:
                    return response, 409
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)
    
    @api.doc('Update data of MIB')
    def put(self):
        try:
            req = api.payload
            config = {'ip': req['ip'], 'host': req['host'], 'location': req['location'], 'contact': req['contact']}
            response = snmp_controller.set(req['ip'], {'1.3.6.1.2.1.1.5.0': req['host'], '1.3.6.1.2.1.1.6.0': req['location'], '1.3.6.1.2.1.1.4.0': req['contact']}, hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol))
            if response:
                return {'msg': response}, 200
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

