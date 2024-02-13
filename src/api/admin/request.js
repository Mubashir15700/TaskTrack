import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getRequests = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(
        axios.get(`/admin/requests?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
    );

export const getRequest = async (data) =>
    handleAxiosRequest(axios.get(`/admin/request/${data}`));

export const requestAction = async (data) =>
    handleAxiosRequest(axios.post(`/admin/request-action`, data));
