import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const ProjectService = {};

ProjectService.add = (data) => {
    return axios.post(BACKEND_HOST + "/projects", data, AuthService.authHeader());
};

ProjectService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/projects/" + _id, data, AuthService.authHeader());
};

ProjectService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/projects" , AuthService.authHeader());
};

ProjectService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/projects/" + _id, AuthService.authHeader());
};
ProjectService.search = (data) => {
    return axios.get(BACKEND_HOST + "/projects/" + data, AuthService.authHeader());
};
ProjectService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/projects/" + _id, AuthService.authHeader());
  };
  


export default ProjectService;
