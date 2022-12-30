import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createProduct = (product) => {
    console.log(product);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/product", product)
        .then((response) => {
            return response.data;
        });
};

const getProductById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/product/" + id)
        .then((response) => {
            return response.data;
        });
};

const updateProduct = (id, product) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/product/" + id, product)
        .then((response) => {
            return response.data;
        });
};

const deleteProduct = (productId) => {
    
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/product", { params: { id: productId } })
        .then((response) => {
            return response?.data;
        });
};

const getAllProduct = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/product")
        .then((response) => {
            console.log(response);
            return response?.data;
        });
};

export const ProductService = {
    getAllProduct,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
};