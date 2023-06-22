import { Outlet, Navigate, Route } from 'react-router-dom'
import AuthService from '../services/auth.service';

const PrivateRoute = () => {
  let auth = {'token':false}
  return(
      auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
    
}

export default PrivateRoute;

