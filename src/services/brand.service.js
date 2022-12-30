import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createBrand = (brand) => {
    console.log(brand);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/brand", brand)
        .then((response) => {
            return response.data;
        });
};

const getBrandById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/brand/" + id)
        .then((response) => {
            return response;
        });
};

const updateBrand = (id, brand) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/brand/" + id, brand)
        .then((response) => {
            return response.data;
        });
};

const deleteBrand = (id) => {
    console.log(id);
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/brand/" + id)
        .then((response) => {
            return response.data;
        });
};

const getAllBrand = () => {
    return axios.get(configAPI.baseUrlApi + "/api/v1/brand").then((response) => {
        return response.data;
    });
};

export const BrandService = {
    getAllBrand,
    createBrand,
    getBrandById,
    updateBrand,
    deleteBrand,
};