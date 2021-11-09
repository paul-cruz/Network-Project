import napalm

from controllers.main_controller import DeviceController

class UserController(DeviceController):
  def __init__(self) -> None:
    self.ips = ["192.168.10.254", "192.168.20.254"]

  def createUser(self, ip:str, user: str, password: str, newUser: str, newPassword: str):
    try:
      for deviceIp in self.ips:
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config='username %s priv 15 pass %s\n'%(newUser, newPassword))
        device.commit_config()
        device.close()
    except Exception as e:
      return False, {"response": "Error: %s"%e}
    return True, {"response": "User %s has been inserted"%newUser}

  def updateUser(self, ip: str, user: str, password: str, newPassword: str):
    try:
      for deviceIp in self.ips:
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config = "username %s privilege 15 password 0 %s"%(user, newPassword))
        device.commit_config()
        device.close()
    except Exception as e:
      return False, {"response": "Error: %s"%e}
    return True, {"response": "Password of user %s has been updated"%user}

  def deleteUser(self, ip: str, user: str, password: str):
    try:
      for deviceIp in self.ips:
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config = "no username %s privilege 15 password %s"%(user, password))
        device.commit_config()
        device.close()
    except Exception as e:
      return False, {"response": "Error: %s"%e}
    return True, {"response": "User '%s' has been deleted"%user}

#Usage:
#userController = UserController()
#print(userController.createUser("10.0.1.254", "cisco", "peciscodro2", "pedro", "pedro2"))
