import React from "react";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { useRecoilValue } from "recoil";
import loggedUserAtom from "./atoms/loggedUserAtom";
import Feed from "./pages/Feed";
import CreatePost from "./components/CreatePost";


const App = () => {
  // const loggedUser = localStorage.getItem('user-threads')
  const user = useRecoilValue(loggedUserAtom)
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={user?<Home />:<Navigate to='/auth'/>}/>
        <Route path="/auth" element={user?<Navigate to='/' />:<Auth />}/>
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </>
  );
};

export default App;
