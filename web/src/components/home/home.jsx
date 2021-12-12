import { useState } from "react";

import NavBar from "./components/navbar";
import Graph from "./components/pages/graph/graph";
import Logs from "./components/pages/logs/logs";
import Topology from "./components/pages/topology/topology";
import Users from "./components/pages/users/users";
import Packages from "./components/pages/packages/packages";

function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [<Topology />, <Users />, <Logs pageIndex ={pageIndex}/>, <Graph />, <Packages />];

  const getPage = () => {
    return pages[pageIndex];
  };

  return (
    <div>
      <NavBar set_page={setPageIndex} />
      {getPage()}
    </div>
  );
}

export default Home;
