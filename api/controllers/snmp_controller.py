from pysnmp import hlapi
from pysnmp.hlapi import *
import os
import napalm

class SNMPController:
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

    def get(self, target, oids, credentials, port=161, engine=hlapi.SnmpEngine(), context=hlapi.ContextData()):
        handler = hlapi.getCmd(
            engine,
            credentials,
            hlapi.UdpTransportTarget((target, port)),
            context,
            *self.construct_object_types(oids)
        )
        return self.fetch(handler, 1)[0]
    
    def get_bulk(self, target, oids, credentials, count, start_from = 0, port = 161, engine = hlapi.SnmpEngine(), context = hlapi.ContextData()):
        handler = hlapi.bulkCmd(
            engine,
            credentials,
            hlapi.UdpTransportTarget((target, port)),
            context,
            start_from, count,
            *self.construct_object_types(oids)
        )

        return self.fetch(handler, count)

    def get_bulk_auto(self, target, oids, credentials, count_oid, start_from = 0, port = 161, engine = hlapi.SnmpEngine(), context = hlapi.ContextData()):
        count = self.get(target, [count_oid], credentials, port, engine, context)[count_oid]
        return self.get_bulk(target, oids, credentials, count, start_from, port, engine, context)

    def construct_object_types(self, list_of_oids):
        object_types = []
        for oid in list_of_oids:
            object_types.append(hlapi.ObjectType(hlapi.ObjectIdentity(oid)))
        return object_types

    def fetch(self, handler, count):
        result = []
        for i in range(count):
            try:
                error_indication, error_status, error_index, var_binds = next(handler)
                if not error_indication and not error_status:
                    items = {}
                    for var_bind in var_binds:
                        items[str(var_bind[0])] = self.cast(var_bind[1])
                    result.append(items)
                else:
                    raise RuntimeError('Got SNMP error: {0}'.format(error_indication))
            except StopIteration:
                break
        return result

    def cast(self, value):
        try:
            return int(value)
        except (ValueError, TypeError):
            try:
                return str(value)
            except (ValueError, TypeError):
                pass
        return value

    def set(self, target, value_pairs, credentials, port=161, engine=hlapi.SnmpEngine(), context=hlapi.ContextData()):
        try:
            device = self.prepareDevice(target, 'cisco', 'cisco')
            device.load_merge_candidate(config = "host %s"%(value_pairs['1.3.6.1.2.1.1.5.0']))
            device.commit_config()
            device.close()
            handler = hlapi.setCmd(
                engine,
                credentials,
                hlapi.UdpTransportTarget((target, port)),
                context,
                *self.construct_value_pairs(value_pairs)
            )
            return self.fetch(handler, 1)[0]
        except Exception as e:
            print("Error!!!")
            print(e)
            return False, {"response": "Error: %s"%e}
        
    def construct_value_pairs(self, list_of_pairs):
        pairs = []
        for key, value in list_of_pairs.items():
            pairs.append(hlapi.ObjectType(hlapi.ObjectIdentity(key), value))
        return pairs

#Usage: 
#snmpController = SNMPController()
#print(snmpController.get('192.168.10.254', ['1.3.6.1.2.1.1.5.0', '1.3.6.1.2.1.1.6.0', '1.3.6.1.2.1.1.4.0', '1.3.6.1.2.1.1.1.0'], hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol)))

#its = snmpController.get_bulk_auto('192.168.10.254', ['1.3.6.1.2.1.2.2.1.2', '1.3.6.1.2.1.31.1.1.1.18'], hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol), '1.3.6.1.2.1.2.1.0')
"""for it in its:
    for k,v in it.items():
        print("{0}={1}".format(k, v))
    print('')
"""
#snmpController.newSet('192.168.10.254')
#snmpController.set('192.168.10.254', {'1.3.6.1.2.1.1.5.0': 'SNMPHost', '1.3.6.1.2.1.1.6.0': 'new location', '1.3.6.1.2.1.1.4.0': 'New contact'}, hlapi.UsmUserData('cisco', authKey='ciscocisco', privKey='ciscocisco', authProtocol=hlapi.usmHMACSHAAuthProtocol, privProtocol=hlapi.usmDESPrivProtocol))

