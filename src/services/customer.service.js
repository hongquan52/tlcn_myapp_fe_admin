import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createCustomer = (customer) => {
    console.log(customer);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/customer", customer)
        .then((response) => {
            return response.data;
        });
};

const getCustomerById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/customer/" + id)
        .then((response) => {
            return response;
        });
};

const updateCustomer = (id, customer) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/customer/" + id, customer)
        .then((response) => {
            return response.data;
        });
};

const deleteCustomer = (id) => {
    console.log(id);
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/customer/" + id)
        .then((response) => {
            return response.data;
        });
};

const getAllCustomer = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/customer")
        .then((response) => {
            console.log(response);

            return response.data;
        });
};

export const CustomerService = {
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    createCustomer,
};