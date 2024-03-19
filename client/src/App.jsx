import React from "react";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </>
  );
};

export default App;
