import DeviceItem from "./device_item";

function DevicesList() {
  return (
    <ul>
      <li>
        <DeviceItem id={0} name="Dispositivo 1" ip={"192.168.10.254"} />
      </li>
      <li>
        <DeviceItem id={1} name="Dispositivo 2" ip={"192.168.20.254"} />
      </li>
    </ul>
  );
}

export default DevicesList;
