import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
import Cookies from "universal-cookie";
import "./App.css";
import { NavBar } from "./components/NavBar.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Services } from "./pages/services/Services.jsx";
import Search from "./pages/search/Search.jsx";
import AddItem from "./pages/item/Item.jsx";
import { Pickups } from "./pages/recycler/Pickups.jsx";
import Recyclers from "./pages/recycler/Recyclers";
export const cookies = new Cookies();
import Global from "./utils/Global.js";

export const App = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!Global.user) {
      const token = Global.token || cookies.get("token");
      if (token) {
        try {
          Global.token = token;
          Global.getUser().then(user => {
            Global.user = user;
            setLoaded(true);
          })
        } catch (e) {
          setLoaded(true);
          // if (loginRequiredPaths.includes(location.pathname)) {
          //   navigate("/login")
          // }
        }
      }
      else {
        setLoaded(true);
        // if (loginRequiredPaths.includes(location.pathname)) {
        //   navigate("/login")
        // }
      }
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="recycler">
            <Route path="pickups" element={<Pickups />} />
          </Route>
          <Route path="recyclers" element={<Recyclers />} />
          <Route path="recyclers/:id/schedule-pickup" element={<AddItem />} />
          <Route path="" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="register" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} />
          <Route path="search" element={<Search />} />
          <Route path="add-item" element={<AddItem />} />
        </Route>
      </Routes>
    </>
  )
}