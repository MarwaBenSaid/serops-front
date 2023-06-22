import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const ApplicationService = {};

ApplicationService.add = (data) => {
    return axios.post(BACKEND_HOST + "/applications", data, AuthService.authHeader());
};

ApplicationService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/Applications/" + _id, data, AuthService.authHeader());
};

ApplicationService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/applications" , AuthService.authHeader());
};

ApplicationService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/Applications/" + _id, AuthService.authHeader());
};
ApplicationService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/Applications/" + _id, AuthService.authHeader());
  };
  


export default ApplicationService;
