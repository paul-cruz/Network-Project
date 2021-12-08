import napalm

from controllers.main_controller import DeviceController

class UserController(DeviceController):
  def createUser(self, ip:str, user: str, password: str, newUser: str, newPassword: str):
    success, self.ips, self.visited, _ = self.getTopology(ip, 'R1', user, password)
    try:
      for deviceIp in self.ips:
        print(deviceIp)
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config='username %s priv 15 pass %s\n'%(newUser, newPassword))
        device.commit_config()
        print("Added user on ",deviceIp)
        device.close()
    except Exception as e:
      print(traceback.format_exc())
      return False, {"response": "Error: %s"%e}
    return True, {"response": "User %s has been inserted"%newUser}

  def updateUser(self, ip: str, user: str, password: str, newPassword: str):
    success, self.ips, self.visited, _ = self.getTopology(ip, 'R1', user, password)
    try:
      for deviceIp in self.ips:
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config = "username %s privilege 15 password 0 %s"%(user, newPassword))
        device.commit_config()
        device.close()
    except Exception as e:
      print(traceback.format_exc())
      return False, {"response": "Error: %s"%e}
    return True, {"response": "Password of user %s has been updated"%user}

  def deleteUser(self, ip: str, user: str, password: str):
    success, self.ips, self.visited, _ = self.getTopology(ip, 'R1', user, password)
    try:
      for deviceIp in self.ips:
        device = self.prepareDevice(deviceIp, user, password)
        device.load_merge_candidate(config = "no username %s privilege 15 password %s"%(user, password))
        device.commit_config()
        device.close()
    except Exception as e:
      print(traceback.format_exc())
      return False, {"response": "Error: %s"%e}
    return True, {"response": "User '%s' has been deleted"%user}

#Usage:
#userController = UserController()
#print(userController.createUser("10.0.1.254", "cisco", "peciscodro2", "pedro", "pedro2"))
