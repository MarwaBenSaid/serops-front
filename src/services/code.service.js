import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const CodeService = {};

CodeService.add = (data) => {
    return axios.post(BACKEND_HOST + "/sources", data, AuthService.authHeader());
};

CodeService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/sources/" + _id, data, AuthService.authHeader());
};

CodeService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/sources" , AuthService.authHeader());
};

CodeService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/sources/" + _id, AuthService.authHeader());
};
CodeService.search = (data) => {
    return axios.get(BACKEND_HOST + "/sources/" + data, AuthService.authHeader());
};
CodeService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/sources/" + _id, AuthService.authHeader());
  };
  


export default CodeService;
