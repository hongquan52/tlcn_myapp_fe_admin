import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createEmployee = (employee) => {
    console.log(employee);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/user", employee)
        .then((response) => {
            return response.data;
        });
};

const getEmployeeById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/user/" + id)
        .then((response) => {
            return response;
        });
};

const updateEmployee = (id, employee) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/user/" + id, employee)
        .then((response) => {
            return response.data;
        });
};

const deleteEmployee = (id) => {
    console.log(id);
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/user/" + id)
        .then((response) => {
            return response.data;
        });
};

const getAllEmployee = () => {
    return axios.get(configAPI.baseUrlApi + "/api/v1/user").then((response) => {
        return response.data;
        
    });
};

const getAllShipper = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/user/listShipper")
        .then((response) => {
            return response.data;
            console.log(response);
        });
};

const LoginEmployee = (data) => {
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/user/login", data)
        .then((response) => {
            return response;
            console.log(response);
        });
};

export const EmployeeService = {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    LoginEmployee,
    getAllShipper,
};