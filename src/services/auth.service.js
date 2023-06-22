import axios from "axios";
const AUTH_HOST= "http://localhost:8000";
const AuthService = {};
AuthService.login = (email, password) => {
        return axios
            .post(AUTH_HOST + "/auth/login", {
                email: email,
                password: password
            });
    }
    
AuthService.register = (data) => {
        return axios.post(AUTH_HOST + "/auth/register", data);
    };

    AuthService.verify=(token)=>{

        return axios.get(AUTH_HOST+"/auth/activate/",token)
    }

AuthService.logout = ()=> {
  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
      
    }


    
      
      
AuthService.getUser = () =>{
        let user = localStorage.getItem('user');
        if (user) {
            return user;
        } else {
            return false;
        }
    
   
}
AuthService.authHeader = () =>{
    
        let token = localStorage.getItem('token');
        if (token) {
            return { headers: {
                    Authorization: "Token "+token
                }
            };
        }
        else {
            window.location.href = "/login";
        }

    

}

AuthService.update = (user) => {
    return axios.put(AUTH_HOST + "/users/" + user._id,user,AuthService.authHeader());
}
AuthService.getOne = (id) => {
    console.log(id)
    return axios.get(AUTH_HOST + "/users/" + id,AuthService.authHeader());
}
AuthService.resendVerify = () => {
    return axios
        .get(AUTH_HOST + "/resend");
}


AuthService.forgetPassword = (email) => {
    return axios
        .get(AUTH_HOST + "/reset/users/" + email);
}

AuthService.resetPassword = (data) => {
    return axios
        .post(AUTH_HOST + "/password",data);
}



export default AuthService;
