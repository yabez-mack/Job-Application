// import React from "react";

import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";




const Private = ({ children }) => {
    const cookie = Cookies.get('user');

return cookie ===undefined||cookie===''||cookie===null? <Navigate to='/'/>:children
}


export default Private
