import napalm
import json

class DeviceController:
  def prepareDevice(self, ip: str, user: str, password: str):
    driver = napalm.get_network_driver('ios')
    optional_args = {}
    optional_args['dest_file_system'] = 'nvram:'
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

  def getAllDevices(self, user: str, password: str, ip: str):
    devices = []
    device = self.prepareDevice(ip, user, password)
    arpTable = device.get_arp_table()
    for register in arpTable:
      if register["age"] != -1.0:
        if register["ip"] not in devices:
          devices.append(register["ip"])
    device.close()

    for deviceIp in devices:
      try:
        newDevice = self.prepareDevice(deviceIp, user, password)
        newArpTable = newDevice.get_arp_table()
        for register in newArpTable:
          if register["age"] != -1.0:
            if register["ip"] not in devices:
              devices.append(register["ip"])
        newDevice.close()
      except Exception as e:
        print(e)
        continue
    print(devices)
    return devices

#Usage
#mainController =  DeviceController()
#mainController.getAllDevices("cisco", "cisco", "192.168.10.254")
