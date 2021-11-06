import napalm

from main_controller import DeviceController

class RSAController(DeviceController):
  def addRSASupport(self, ip: str, user: str, password: str):
    try:
      device = self.prepareDevice(ip, user, password)
      commands = """
          enable secret 1234\n
          ip domain-name adminredes.escom.ipn.mx\n
          ip ssh rsa keypair-name sshkey\n
          crypto key generate rsa usage-keys label ssh modulus 1024\n
          ip ssh v 2\n
          ip ssh time-out 30\n
          ip ssh authentication-retries 5\n
          line vty 0 15\n
          transport input ssh telnet\n
      """
      device.load_merge_candidate(config = commands)
      device.commit_config()
      device.close()
    except Exception as e:
      return False, {"response": "%s"%e}
    return True, {"response": "RSA support has been activated in %s"%ip}

#Usage: 
#rsaController = RSAController()
#print(rsaController.addRSASupport('10.0.1.254', 'pedro', 'pedro2'))
