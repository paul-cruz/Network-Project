from flask_restplus import Api
from .AppUser import api as nsAppUser
from .DeviceUser import api as nsDeviceUser
from .Protocols import api as nsProtocol
from .RSA import api as nsRSA
from .Topology import api as nsTopology
from .Logs import api as nsLogs
from .Snmp import api as nsSnmp

api = Api(
    title='Network Project API',
    version='1.0',
    description='this is the API for the network project',
    prefix='/api'
)

api.add_namespace(nsAppUser, path='/appuser')
api.add_namespace(nsDeviceUser, path='/deviceUser')
api.add_namespace(nsProtocol, path='/protocols')
api.add_namespace(nsRSA, path='/RSA')
api.add_namespace(nsTopology, path='/topology')
api.add_namespace(nsLogs, path= '/logs')
api.add_namespace(nsSnmp, path="/SNMP")