import DeviceItem from "./device_item";

function DevicesList(props) {
  return (
    <ul>
      {props.ips.map((ip, index) => {
        return <li>
        <DeviceItem id={index} name={props.names[index]} ip={ip} />
      </li>
      })}
    </ul>
  );
}

export default DevicesList;
