import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST ="http://localhost:8000/api";

const OrganisationService = {};

OrganisationService.add = (data) => {
    return axios.post(BACKEND_HOST + "/organisation", data, AuthService.authHeader());
};

OrganisationService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/organisation" + _id, data, AuthService.authHeader());
};

OrganisationService.getAll = ()=> {
    return axios.get(BACKEND_HOST + "/organisation" , AuthService.authHeader());
};

OrganisationService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/organisation" + _id, AuthService.authHeader());
};
OrganisationService.deleteOne = (_id) => {
    return axios.delete(BACKEND_HOST + "/organisation" + _id, AuthService.authHeader());
  };
  


export default OrganisationService;
