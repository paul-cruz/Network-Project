import os
from controllers.logs_controller import LogsController
from flask_restx import Namespace, Resource, fields

logs_controller = LogsController()

api = Namespace('logs', description='Methods related with logs of the app')

log = api.model('Log data to be stored', {
    "user": fields.String(description='User who did this action'),
    "action": fields.String(description='The action that the user did'),
})

@api.route('/')
@api.response(404, 'Log not found')
@api.response(409, 'Error from database')
@api.response(500, 'Server Error')
class Logs(Resource):
    @api.doc('Add a register to logs')
    @api.expect(log)
    def post(self):
        try:
            req = api.payload
            config = {'user': req['user'], 'action': req['action']}
            success, response = logs_controller.addLog(config['user'], config['action'])
            if response and success:
                return {'msg': response["response"]}, 200
            else:
                return response, 409
        except ValueError as ve:
            api.abort(404)
        except Exception as e:
            print('Server Error', e)
            api.abort(500)

    @api.doc('Get logs from DB')
    def get(self):
        try:
            success, logs = logs_controller.getLogs()
            if success and logs:
              return logs
            else:
              return {}
        except ValueError as ve:
            print('DB exception', ve)
            api.abort(404)
        except Exception as e:
            print('Connection Error', e)
            api.abort(500)
