import napalm
import json
import time
import traceback
from pysnmp import hlapi

class DeviceController:
  def prepareDevice(self, ip: str, user: str, password: str):
    driver = napalm.get_network_driver('ios')
    optional_args = {}
    optional_args['dest_file_system'] = 'nvram:'
    optional_args['fast_cli'] = False
    try:
        device = driver(hostname=ip, username=user, password=password, optional_args=optional_args)
    except:
        print("No SSH Supported trying with telnet...")

    optional_args['transport'] = 'telnet'
    try:
        device = driver(hostname=ip, username=user, password=password, optional_args=optional_args)
    except:
        print("No SSH and no telnet support...")
    device.open()
    print("Opening %s..."%ip)
    return device

  def getNetworkIds(self, ip: str, user: str, password: str):
    try:
      networks = []
      device = self.prepareDevice(ip, user, password)
      arpTable = device.get_arp_table()
      for register in arpTable:
        if register["age"] != -1.0:
          print(register['ip'])
          splittedIp = register["ip"].split(".")
          splittedIp[-1] = "0"
          networkIp = ".".join(splittedIp)
          networks.append(networkIp)
      return networks, device
    except Exception as e:
      print("Error: ", e)

  def configProtocol(self, device, ip, user, password, protocol, wildcard = "0.0.0.255", area="0"):
    try:
      if protocol == "RIP":
        print(neighbors)
        networks, device = self.getNetworkIds(ip, user, password)
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

        time.sleep(30)
      elif protocol == "OSPF":
        networks, device = self.getNetworkIds(ip, user, password)
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

        time.sleep(30)
      else:
        networks, device = self.getNetworkIds(ip, user, password)
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

        time.sleep(30)
    except Exception as e:
      print(e) 

  def getDeviceNeighbors(self, ip, user, password): 
    routers = []
    ips = [] 
    try:
      device = self.prepareDevice(ip, user, password)
      command = ["show cdp neighbors detail"]
      data = device.cli(command)
      splittedLines = data['show cdp neighbors detail'].split('\n')
      for line in splittedLines:
        line = line.strip()
        try:
          if(line[0]=='D' and line[1] != 'u'):
            routers.append(line.split(':')[1].split('.')[0].strip())
          if(line[0] == 'I' and line[1] == 'P'):
            ips.append(line.split(':')[1].strip())
        except:
          continue
        finally:
          device.close()
      return ips, routers
    except Exception as e:
      print(e)
      return False, e

  def getDevicesData(self, ip: str, user: str, password: str, configureProtocol = False, protocol = "RIP"):
    routers = []
    ips = [] 
    try:
      device = self.prepareDevice(ip, user, password)
      command = ["show cdp neighbors detail"]
      data = device.cli(command)
      splittedLines = data['show cdp neighbors detail'].split('\n')
      for line in splittedLines:
        line = line.strip()
        try:
          if(line[0]=='D' and line[1] != 'u'):
            routers.append(line.split(':')[1].split('.')[0].strip())
          if(line[0] == 'I' and line[1] == 'P'):
            ips.append(line.split(':')[1].strip())
        except:
          continue
        finally:
          device.close()
      return ips, routers
    except Exception as e:
      print(e)
      return False, e

  def getTopology(self, ip, name, user, password):
    from controllers.snmp_controller import SNMPController
    #from snmp_controller import SNMPController

    snmp_controll = SNMPController()
    host = snmp_controll.get(ip, ['1.3.6.1.2.1.1.5.0'], hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol))
    name = host['1.3.6.1.2.1.1.5.0'].split(".")[0]
    try:
      next = [ip]
      visited = [name]
      currentName = [name]
      allIps = [ip]
      graphData = {}
      while next:
        router = next.pop(0)
        ips, names = self.getDevicesData(router, user, password)
        if len(currentName) > 0:
          curName = currentName.pop(0)
          graphData[curName] = []
          for index2, ip2 in enumerate(ips):
            graphData[curName].append(names[index2])
        for index, name in enumerate(names):
          if name not in visited:
            next.append(ips[index])
            visited.append(name)
            currentName.append(name)
            allIps.append(ips[index])
      return True, allIps, visited, graphData
    except Exception as e:
      print(traceback.format_exc())
      print(e)
      return False

#Usage
#mainController =  DeviceController()
#mainController.insertRoutingInAllDevices("192.168.10.254", 'cisco', 'cisco')
#print(mainController.getTopology('192.168.10.254', 'R1', 'cisco', 'cisco'))
#print(mainController.getNetworkIds('192.168.10.254', 'cisco', 'cisco'))