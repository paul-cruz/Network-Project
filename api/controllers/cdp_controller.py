import napalm
import pymongo
import pprint
from Crypto.Hash import SHA256
from pymongo.collection import ReturnDocument
from datetime import datetime
from main_controller import DeviceController

class CDPController(DeviceController):
  def getTopology(self, ip, name, user, password):
    """try:
      next = [ip]
      visited = [name]
      allIps = [ip]
      network = {}
      while next:
        router = next.pop(0)
        #ips, names = self.getDevicesData(router, user, password, True, "RIP")
        ips, names = self.getDevicesData(router, user, password)
        network[router] = []
        for index, name in enumerate(names):
          network[router].append(ips[index])
          if name not in visited:
            next.append(ips[index])
            visited.append(name)
            allIps.append(ips[index])
      print(allIps) 
      print(network)
      return allIps, visited, network
    except Exception as e:
      print(e)"""
#Usage
#cdpController = CDPController()
#cdpController.getTopology('192.168.10.254', 'R1', 'cisco', 'cisco')
