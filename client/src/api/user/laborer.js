import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getLaborers = async (id, pageParam, lat = null, lon = null) =>
    handleAxiosRequest(axios.get(`/laborers/${id}/${pageParam}`, { params: { lat, lon } }));

export const getLaborer = async (id) => handleAxiosRequest(axios.get(`/laborers/${id}`));
