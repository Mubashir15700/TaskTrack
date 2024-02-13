import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getLaborers = async (userId, pageParam, lat = null, lon = null) =>
    handleAxiosRequest(axios.get(`/laborers/${userId}/${pageParam}`, { params: { lat, lon } }));

export const getLaborer = async (data) => handleAxiosRequest(axios.get(`/laborer/${data}`));
