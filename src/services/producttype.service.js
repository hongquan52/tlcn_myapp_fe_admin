import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createProductType = (producttype) => {
    console.log(producttype);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/productType", producttype)
        .then((response) => {
            return response.data;
        });
};

const getProductTypeById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/productType/" + id)
        .then((response) => {
            return response;
        });
};

const updateProductType = (id, producttype) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/productType/" + id, producttype)
        .then((response) => {
            return response.data;
        });
};

const deleteProductType = (id) => {
    console.log(id);
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/productType/" + id)
        .then((response) => {
            return response.data;
        });
};

const getAllProductType = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/productType")
        .then((response) => {
            return response.data;
        });
};

export const ProductTypeService = {
    getAllProductType,
    getProductTypeById,
    updateProductType,
    deleteProductType,
    createProductType,
};