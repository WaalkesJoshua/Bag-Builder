// import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDiscs } from "./slicers/discSlice";
import WelcomePage from "./components/WelcomePage";
import Navbar from "./components/Navbar";
import UserHome from "./components/UserHome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import GuestHome from "./components/GuestHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/guest" element={<GuestHome />} />
            <Route path="/user" element={<UserHome/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;

