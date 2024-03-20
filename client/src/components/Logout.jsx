import { Button } from "@chakra-ui/react";
import React from "react";
import {  useSetRecoilState } from "recoil";
import loggedUserAtom from "../atoms/loggedUserAtom";

const Logout = () => {
    const setLoggedUser = useSetRecoilState(loggedUserAtom);
  const handleClick = async () => {
    try {
      setLoggedUser(null);
      localStorage.removeItem("user-threads");
      const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      console.log(data)
      if (!data.success) {
        return alert(`${data.message}`);
      }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <Button
      _hover={{
        bg: "blue.100",
      }}
      zIndex={"22"}
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default Logout;
