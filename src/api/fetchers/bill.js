import { API } from "../baseUrl";

export const getAllBill = async () => {
    try {
      const response = await API.get(`/api/v1/bill`);
      
      return response;
    } catch (error) {}
}


