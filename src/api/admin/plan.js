import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getPlans = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/plans?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));

export const getPlan = async (data) =>
    handleAxiosRequest(axios.get(`/admin/plan/${data}`));

export const addPlan = async (data) =>
    handleAxiosRequest(axios.post(`/admin/add-plan`, data));

export const editPlan = async (data) =>
    handleAxiosRequest(axios.put(`/admin/edit-plan/${data._id}`, data));

export const planAction = async (data) =>
    handleAxiosRequest(axios.patch(`/admin/plan-action/${data}`));

export const getSubscriptions = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/subscriptions?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));
