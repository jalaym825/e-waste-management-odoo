import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import Cookies from "universal-cookie";
import "./App.css";
export const cookies = new Cookies();

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
