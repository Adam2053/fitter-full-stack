import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

const Auth = () => {
   const authScreenState = useRecoilValue(authScreenAtom);
  return (
    <>
        {authScreenState === "login" ? <Login /> : <Signup />} 
    </>
  )
}

export default Auth