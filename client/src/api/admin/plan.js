import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getPlans = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/plans?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));

export const getPlan = async (id) =>
    handleAxiosRequest(axios.get(`/admin/plans/${id}`));

export const addPlan = async (data) =>
    handleAxiosRequest(axios.post(`/admin/plans/add`, data));

export const editPlan = async (data) =>
    handleAxiosRequest(axios.put(`/admin/plans/${data._id}/edit`, data));

export const planAction = async (id) =>
    handleAxiosRequest(axios.patch(`/admin/plans/${id}/list-unlist`));

export const getSubscriptions = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/subscriptions?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));
