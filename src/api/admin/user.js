import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getUsers = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(
        axios.get(`/admin/users?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
    );

export const getUser = async (data) =>
    handleAxiosRequest(axios.get(`/admin/user/${data}`));

export const userAction = async (data) =>
    handleAxiosRequest(axios.post(`/admin/user-action`, data));
