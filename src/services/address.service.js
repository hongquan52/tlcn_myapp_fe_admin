import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getAddressByUser = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/address/user", {params: {userId : 2}})
        .then((response) => {
            return response.data;
        });
};

export const AddressService = {
    getAddressByUser,
};