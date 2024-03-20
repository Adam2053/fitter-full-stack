import { atom } from "recoil";


const loggedUserAtom = atom({
    key: "loggedUserAtom",
    default: JSON.parse(localStorage.getItem('user-threads'))
})

export default loggedUserAtom;