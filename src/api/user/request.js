import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const sendRequest = async (data) => {
    return handleAxiosRequest(axios.post("/send-request", data));
};

export const getPrevRequest = async (data) => {
    return handleAxiosRequest(axios.get(`/prev-request/${data}`));
};

export const updateRequest = async (data) => {
    return handleAxiosRequest(axios.put("/update-request", data));
};

export const cancelRequest = async (data) => {
    return handleAxiosRequest(axios.patch("/cancel-request", data));
};
