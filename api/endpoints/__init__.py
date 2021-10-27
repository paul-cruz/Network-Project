from flask_restplus import Api
from .AppUser import api as nsAppUser

api = Api(
    title='Network Project API',
    version='1.0',
    description='this is the API for the network project',
    prefix='/api'
)

api.add_namespace(nsAppUser, path='/app-user')