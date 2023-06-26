import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const EnvironmentService = {};

EnvironmentService.add = (data) => {
    return axios.post(BACKEND_HOST + "/environments", data, AuthService.authHeader());
};

EnvironmentService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/environments/" + _id, data, AuthService.authHeader());
};

EnvironmentService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/environments" , AuthService.authHeader());
};

EnvironmentService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/environments/" + _id, AuthService.authHeader());
};
EnvironmentService.search = (data) => {
    return axios.get(BACKEND_HOST + "/environments/" + data, AuthService.authHeader());
};
EnvironmentService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/environments/" + _id, AuthService.authHeader());
  };
  


export default EnvironmentService;
