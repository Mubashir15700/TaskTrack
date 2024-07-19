import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getRequests = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(
        axios.get(`/admin/requests?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
    );

export const getRequest = async (id) =>
    handleAxiosRequest(axios.get(`/admin/requests/${id}`));

export const requestAction = async (data) =>
    handleAxiosRequest(axios.post(`/admin/requests/list-unlist`, data));
