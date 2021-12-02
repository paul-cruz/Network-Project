import Container from "react-bootstrap/Container";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import classes from "./graph.module.css";

const data = [
  {
    name: "Número de dispositivos",
    value: 2400,
  },
  {
    name: "Paquetes enviados x día",
    value: 3000,
  },
  {
    name: "Paquetes perdidos x día",
    value: 2000,
  },
  {
    name: "",
    value: 2780,
  },
];

const Graph = () => {
  return (
    <>
      <Container>
        <h1>Datos de la red</h1>
      </Container>
      <div className={classes.center}>
        <BarChart
          className={classes.graph_container}
          width={window.innerWidth - 200}
          height={window.innerHeight - 150}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
};

export default Graph;
