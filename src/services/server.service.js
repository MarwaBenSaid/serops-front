import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const ServerService = {};

ServerService.add = (data) => {
    return axios.post(BACKEND_HOST + "/serversnew", data, AuthService.authHeader());
};

ServerService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/servers/" + _id, data, AuthService.authHeader());

};
ServerService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/serversdelete/" + _id, AuthService.authHeader());
  };
  
ServerService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/serversall" , AuthService.authHeader());
};

ServerService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/servers/" + _id, AuthService.authHeader());
};



export default ServerService;
