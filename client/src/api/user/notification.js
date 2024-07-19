import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getUserNotificationCount = async (id) =>
    handleAxiosRequest(axios.get(`/notifications/count/${id}`));

export const getUserNotifications = async (id, pageParam) =>
    handleAxiosRequest(axios.get(`/notifications/${id}/${pageParam}`));

export const getUserNotificationDetails = async (id) =>
    handleAxiosRequest(axios.get(`/notifications/${id}`));

export const markNotificationOpened = async (id) =>
    handleAxiosRequest(axios.patch(`/notifications/${id}/mark-read`));
