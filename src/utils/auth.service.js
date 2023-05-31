import axios from "axios";
import {useNavigate} from 'react-router-dom';

const AUTH_HOST = "http://localhost:8000";
const AuthService = {}
AuthService.login = (email, password) => {
        return axios
            .post(AUTH_HOST + "/auth/login", {
                email: email,
                password: password
            });
    }

AuthService.logout = ()=> {
  
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
      
    }

AuthService.isLoggedIn = () =>{
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        let payload = atob(token.split(".")[1]);
        let exp = new Date(JSON.parse(payload).exp * 1000);
        return exp > new Date();
    } else {
        return false;
    }
}
AuthService.getAdmin = () =>{
    if(AuthService.isLoggedIn()) {
        let admin = JSON.parse(localStorage.getItem('admin'));
        if (admin) {
            return admin;
        } else {
            return false;
        }
    }
    else{
        return false;
    }
}
AuthService.authHeader = () =>{
    if(AuthService.isLoggedIn()) {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            return { headers: {
                    Authorization: token
                }
            };
        }
        else {
            window.location.href = "/auth/login";
        }

    }
    else{
        window.location.href = "/auth/login";
    }
}

AuthService.update = (admin) => {
    return axios.put(AUTH_HOST + "/admins/" + admin._id,admin,AuthService.authHeader());
}
AuthService.getOne = (id) => {
    console.log(id)
    return axios.get(AUTH_HOST + "/admins/" + id,AuthService.authHeader());
}


AuthService.forgetPassword = (email) => {
    return axios
        .get(AUTH_HOST + "/reset/users/" + email);
}

AuthService.resetPassword = (data) => {
    return axios
        .post(AUTH_HOST + "/reset/users",data);
}



export default AuthService;
