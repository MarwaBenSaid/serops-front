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

ApplicationService.filter = (data)=> {
    return axios.post(BACKEND_HOST + "/applications/filter" ,data, AuthService.authHeader());
};


ApplicationService.filterByProject = (projectId) => {
    const data = { id: projectId }; // Update the request body to match the expected format
    return axios.post(BACKEND_HOST + "/applications/filter", data, AuthService.authHeader());
  };


export default ApplicationService;
