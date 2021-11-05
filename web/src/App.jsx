import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
