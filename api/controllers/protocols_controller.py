import napalm
from .main_controller import DeviceController

class ProtocolsController(DeviceController):
  def activateRIP(self, ip: str, user: str, password: str):
    devices = ["192.168.10.254", "192.168.40.254"]
    for deviceIp in devices:
      device = self.prepareDevice(deviceIp, user, password)
      arpTable = device.get_arp_table()
      for register in arpTable:
        if register["age"] != -1.0:
          if register["ip"] not in devices:
            splittedIp = register["ip"].split(".")
            splittedIp[-1] = "0"
            networkIp = splittedIp.join(".")
            devices.append(networkIp)
      device.close()
      return '{"response": "RIP protocol has been activated."}'
      
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
      return '{"response": "RSA support has been activated in %s"}'%ip