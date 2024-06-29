import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
import Cookies from "universal-cookie";
import "./App.css";
import { NavBar } from "./components/NavBar.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Services } from "./pages/services/Services.jsx";
export const cookies = new Cookies();

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
