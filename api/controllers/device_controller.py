import napalm

class DeviceController:
  def prepareDevice(self, ip: str, user: str, password: str):
    driver = napalm.get_network_driver('ios')
    optional_args = {}
    optional_args['dest_file_system'] = 'nvram:'
    device = driver(hostname=ip, username=user, password=password, optional_args=optional_args)

    print('Opening...')
    device.open()
    return device