import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const sendRequest = async (data) => {
    return handleAxiosRequest(axios.post("/request/send", data));
};

export const getPrevRequest = async (id) => {
    return handleAxiosRequest(axios.get(`/request/pending/${id}`));
};

export const updateRequest = async (data) => {
    return handleAxiosRequest(axios.put("/request/update", data));
};

export const cancelRequest = async (data) => {
    return handleAxiosRequest(axios.patch("/request/cancel", data));
};
