import napalm
import pymongo
from Crypto.Hash import SHA256
from pymongo.collection import ReturnDocument
from datetime import datetime
import os

myclient = pymongo.MongoClient(os.getenv("DB_CONN"))
db = myclient[os.getenv("DB_NAME")]
logs_col = db["logs"]

class LogsController:
  def addLog(self, user: str, action: str):
    try:
      now = datetime.now()
      date = now.strftime("%d/%m/%Y %H:%M:%S")

      logs_col.insert_one({'user': user, 'date': date, 'action': action}).inserted_id
      return True, {'response': "Log has been inserted"}
    except Exception as e:
      print(e)
      return False, e

  def getLogs(self):
    try:
      result = list(logs_col.find())
      if result:
        return True, result
      else:
        return False, []
    except Exception as e:
      print(e)
      return False, e
#Usage:
#userController = UserController()
#print(userController.createUser("10.0.1.254", "cisco", "peciscodro2", "pedro", "pedro2"))
