import { useState } from "react";

import NavBar from "./components/navbar";
import Topology from "./components/pages/topology/topology";
import Users from "./components/pages/users/users";

function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [<Topology />, <Users />];

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
