import napalm
from controllers.main_controller import DeviceController
import time

class ProtocolsController(DeviceController):
  def __init__(self) -> None:
    self.ips = ["192.168.10.254", "192.168.20.254"]

  def getNetworkIds(self, ip: str, user: str, password: str):
    try:
      networks = []
      device = self.prepareDevice(ip, user, password)
      arpTable = device.get_arp_table()
      for register in arpTable:
        if register["age"] != -1.0:
          splittedIp = register["ip"].split(".")
          splittedIp[-1] = "0"
          networkIp = ".".join(splittedIp)
          networks.append(networkIp)
      return networks, device
    except Exception as e:
      print("Error: ", e)

  def deactivateProtocols(self, protocolToActivate: str, deviceIp: str, user: str, password: str):
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

  def activateRIP(self, ip: str, user: str, password: str):
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

      time.sleep(100)
      for deviceIp in self.ips:
        self.deactivateProtocols("RIP", deviceIp, user, password)

    except Exception as e:
      return False, {"response": "%s"%e}
    return True, {"response": "RIP protocol has been activated"}

  def activateOSPF(self, ip: str, user: str, password: str, wildcard: str, area: str):
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

        """
        for network in networks:
          commands += "network %s %s area %s\n"%(network, wildcard, area)
  
        device.load_merge_candidate(config=commands)
        device.commit_config()
        device.close()

      time.sleep(100)

      for deviceIp in self.ips:
        self.deactivateProtocols("OSPF", deviceIp, user, password)
    except Exception as e:
      return False, {"response": "%s"%e}
    return True, {"response": "OSPF protocol has been activated"}

  def activateEIGRP(self, ip: str, user: str, password: str):
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

      time.sleep(100)
      
      for deviceIp in self.ips:
        self.deactivateProtocols("EIGRP", deviceIp, user, password)
    except Exception as e:
      return False, {"response": "%s"%e}
    return True, {"response": "IGRP protocol has been activated"}

#Usage
#protocolsController = ProtocolsController()
#print(protocolsController.activateRIP("192.168.10.254", "cisco", "cisco"))
#print(protocolsController.activateOSPF("192.168.10.254", "cisco", "cisco", "0.0.0.255", "0"))
#print(protocolsController.activateEIGRP("192.168.10.254", "cisco", "cisco"))
