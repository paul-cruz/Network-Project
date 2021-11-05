import napalm
from main_controller import DeviceController

class ProtocolsController(DeviceController):
  def activateRIP(self, ip: str, user: str, password: str):
    ips = ["192.168.10.254", "192.168.40.254"]
    try:
      for deviceIp in ips:
        networks = []
        device = self.prepareDevice(deviceIp, user, password)
        arpTable = device.get_arp_table()
        for register in arpTable:
          if register["age"] != -1.0:
            splittedIp = register["ip"].split(".")
            splittedIp[-1] = "0"
            networkIp = ".".join(splittedIp)
            networks.append(networkIp)
        commands = """router rip
        no auto-summary
        """
        for network in networks:
          commands += "network %s\n"%network
     
  
        device.load_merge_candidate(config=commands)
        print(device.compare_config())
        device.commit_config()

        commands = "no router ospf 1\nno router eigrp 1\n"
        device.load_merge_candidate(config=commands)
        print(device.compare_config())
        device.commit_config()
        device.close()
       # return '{"response": "RIP protocol has been activated"}'
    except Exception as e:
         print("Error: ", e)
    return '{"response": "RIP protocol has been activated"}'
#Usage
protocolsController = ProtocolsController()
print(protocolsController.activateRIP("192.168.10.254", "cisco", "cisco"))
