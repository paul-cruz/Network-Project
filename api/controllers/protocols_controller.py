import napalm
from controllers.main_controller import DeviceController
import time
import traceback

class ProtocolsController(DeviceController):
  def __init__(self) -> None:
    #self.ips, self.visited, _ = self.getTopology('192.168.10.254', 'R1', 'cisco', 'cisco')
    pass
  
  def deactivateProtocols(self, protocolToActivate: str, deviceIp: str, user: str, password: str):
    try:
      device = self.prepareDevice(deviceIp, user, password)
      if protocolToActivate == "RIP":
        commands = "no router ospf 1\nno router eigrp 1\n"
      elif protocolToActivate == "OSPF":
        commands = "no router rip\nno router eigrp 1\n"
      else:
        commands = "no router ospf 1\nno router rip\n"
      device.load_merge_candidate(config=commands)
      device.commit_config()
      device.close()
    except Exception as e:
      print(e)
      print(traceback.format_exc())

  def activateRIP(self, ip: str, user: str, password: str):
    success, self.ips, _ = self.getTopology(ip, 'R1', user, password)
    try:
      for deviceIp in self.ips:
        networks, device = self.getNetworkIds(deviceIp, user, password)
        commands = """
        router ospf 1
        distance 110
        exit
        router EIGRP 1
        distance 100
        exit
        router rip
        distance 80
        version 2
        no auto-summary
        """
        for network in networks:
          commands += "network %s\n"%network
  
        device.load_merge_candidate(config=commands)
        device.commit_config()
        device.close()

      time.sleep(50)
      for deviceIp in self.ips:
        self.deactivateProtocols("RIP", deviceIp, user, password)

    except Exception as e:
      print(e)
      print(traceback.format_exc())
      return False, {"response": "%s"%traceback.format_exc()}
    return True, {"response": "RIP protocol has been activated"}

  def activateOSPF(self, ip: str, user: str, password: str, wildcard: str, area: str):
    success, self.ips, _ = self.getTopology(ip, 'R1', user, password)
    print(self.ips)
    try:
      for deviceIp in self.ips:
        networks, device = self.getNetworkIds(deviceIp, user, password)
        commands = """
        router EIGRP 1
        distance 100
        exit
        router RIP
        distance 120
        exit
        router ospf 1
        distance 90
        redistribute rip subnets
        """
        for network in networks:
          commands += "network %s %s area %s\n"%(network, wildcard, area)
  
        device.load_merge_candidate(config=commands)
        device.commit_config()
        device.close()

      time.sleep(80)

      for deviceIp in self.ips:
        self.deactivateProtocols("OSPF", deviceIp, user, password)
    except Exception as e:
      print(e)
      
      return False, {"response": "%s"%traceback.format_exc()}
    return True, {"response": "OSPF protocol has been activated"}

  def activateEIGRP(self, ip: str, user: str, password: str):
    success, self.ips, _ = self.getTopology(ip, 'R1', user, password)
    try:
      for deviceIp in self.ips:
        networks, device = self.getNetworkIds(deviceIp, user, password)
        commands = """
        router RIP 
        distance 120
        exit
        router OSPF 1
        distance 110
        exit
        router EIGRP 1
        distance 80
        
        """
        for network in networks:
          commands += "network %s\n"%network
  
        device.load_merge_candidate(config=commands)
        device.commit_config()
        device.close()

      time.sleep(80)
      
      for deviceIp in self.ips:
        self.deactivateProtocols("EIGRP", deviceIp, user, password)
    except Exception as e:
      print(self.ips)
      print(e)
      
      return False, {"response": "%s"%traceback.format_exc(), "ips": self.ips}
    return True, {"response": "IGRP protocol has been activated"}

#Usage
#protocolsController = ProtocolsController()
#print(protocolsController.activateRIP("192.168.10.254", "cisco", "cisco"))
#print(protocolsController.activateOSPF("192.168.10.254", "cisco", "cisco", "0.0.0.255", "0"))
#print(protocolsController.activateEIGRP("192.168.10.254", "cisco", "cisco"))
