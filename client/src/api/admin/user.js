import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getUsers = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(
        axios.get(`/admin/users?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
    );

export const getUser = async (id) =>
    handleAxiosRequest(axios.get(`/admin/users/${id}`));

export const userAction = async (data) =>
    handleAxiosRequest(axios.post(`/admin/users/${data.userId}/block-unblock`, { reason: data.reason }));
