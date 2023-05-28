import { Route, Routes , Navigate} from "react-router-dom"
import Login from "../components/Login";
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

 const PrivateRoute = ({children , ...rest}) => {
  let {user} = useContext(AuthContext)
    return (
    <Routes>
  
  <Route {...rest} element={!user ? <Navigate to="/login" /> : Login}/>
    </Routes>
    
  )
}
export default PrivateRoute;
