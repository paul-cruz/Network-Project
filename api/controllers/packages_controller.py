import napalm
import json
from controllers.main_controller import DeviceController
#from main_controller import DeviceController

class PackagesController(DeviceController):
  def getInterfacesCounters(self, ip: str, user: str, password: str, interface: str, ip2: str, interface2: str):
    try:
      device = self.prepareDevice(ip, user, password)
      device2 = self.prepareDevice(ip2, user, password)
      interfaceData = device.get_interfaces_counters()['FastEthernet' + interface]
      interfaceData2 = device2.get_interfaces_counters()['FastEthernet' + interface2]
      lostPackages1 = int(interfaceData2['tx_unicast_packets']) - int(interfaceData['rx_unicast_packets']) 
      lostPackages2 = int(interfaceData['tx_unicast_packets']) - int(interfaceData2['rx_unicast_packets']) 
      return True, {
        'input1': interfaceData['rx_unicast_packets'], 
        'output1': interfaceData['tx_unicast_packets'], 
        'broken1': interfaceData['rx_errors'], 
        'lost1': lostPackages1,
        'input2': interfaceData2['rx_unicast_packets'], 
        'output2': interfaceData2['tx_unicast_packets'], 
        'broken2': interfaceData2['rx_errors'], 
        'lost2': lostPackages2,
      }
    except Exception as e:
      return False, {"response": "%s"%e}

#Usage: 
#packages_controller = PackagesController()
#print(json.dumps(packages_controller.getInterfacesCounters('192.168.10.254', 'cisco', 'cisco', '0/0'), indent=2))
