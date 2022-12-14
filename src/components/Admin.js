
import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";




const Admin = ({ children }) => {
    const cookie = Cookies.get('user');

return cookie ==='admin@gmail.com'? children: <Navigate to='/home'/>
}


export default Admin