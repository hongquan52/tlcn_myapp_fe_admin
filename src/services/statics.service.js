import axios from 'axios'
import configAPI from "../configuration/apiConfig.json";

const getNumberOfProduct = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/product`)
        .then((response) => {
            return response.data
        });
};
const getNumberOfCustomer = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/customer`)
        .then((response) => {
            return response.data
        });
};
const getNumberOfBill = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill`)
        .then((response) => {
            return response.data
        });
};
const getSales = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/sales`)
        .then((response) => {
            return response.data
        });
};
const getNumberProductOfAllBill = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/product`)
        .then((response) => {
            return response.data
        });
};
const getALlUserByDay = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/user/day`)
        .then((response) => {
            return response.data
        });
};
const getAllRevenueByDay = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/day`)
        .then((response) => {
            return response.data
        });
};
// status of bill statistic
const getNumberOfBillWaitingConfirm = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/waitingConfirm`)
        .then((response) => {
            return response.data
        });
};
const getNumberOfBillConfirmed = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/confirmed`)
        .then((response) => {
            return response.data
        });
};
const getNumberOfBillReadyToDelivery = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/readyToDelivery`)
        .then((response) => {
            return response.data
        });
};const getNumberOfBillDelivering = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/delivering`)
        .then((response) => {
            return response.data
        });
};const getNumberOfBillWaitingPaid = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/paid`)
        .then((response) => {
            return response.data
        });
};const getNumberOfBillWaitingCancel = () => { 
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/statistic/bill/status/cancel`)
        .then((response) => {
            return response.data
        });
};
export const StaticsService = {
    getNumberOfProduct,
    getNumberOfCustomer,
    getNumberOfBill,
    getSales,
    getALlUserByDay,
    getAllRevenueByDay,
    getNumberProductOfAllBill,

    getNumberOfBillWaitingConfirm,
    getNumberOfBillConfirmed,
    getNumberOfBillReadyToDelivery,
    getNumberOfBillDelivering,
    getNumberOfBillWaitingPaid,
    getNumberOfBillWaitingCancel,
    
};
