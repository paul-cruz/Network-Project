import napalm

from device_controller import DeviceController

class UserController(DeviceController):
  def createUser(self, ip:str, user: str, password: str, newUser: str, newPassword: str):
    device = self.prepareDevice(ip, user, password)
    device.load_merge_candidate(config='username %s priv 15 pass %s\n'%(newUser, newPassword))
    device.commit_config()
    device.close()
    return '{"response": "User %s has been inserted"}'%newUser

#Usage:
#userController = UserController()
#print(userController.createUser("10.0.1.254", "cisco", "peciscodro2", "pedro", "pedro2"))
