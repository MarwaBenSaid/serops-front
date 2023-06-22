import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000";

const UserService = {};

UserService.add = (data) => {
    return axios.post(BACKEND_HOST + "/users/new", data, AuthService.authHeader());
};

UserService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/users/" + _id, data, AuthService.authHeader());

};
UserService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/users/delete/" + _id, AuthService.authHeader());
  };
  
UserService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/users/all" , AuthService.authHeader());
};

UserService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/users/" + _id, AuthService.authHeader());
};



export default UserService;
