import DeviceItem from "./device_item";

function DevicesList() {
  return (
    <ul>
      <li>
        <DeviceItem name="Dispositivo 1" locked={false} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 2" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
      <li>
        <DeviceItem name="Dispositivo 3" locked={true} />
      </li>
    </ul>
  );
}

export default DevicesList;
