import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getAdminNotificationCount = async () =>
    handleAxiosRequest(axios.get("/admin/notifications/count"));

export const getAdminNotifications = async (pageParam) =>
    handleAxiosRequest(axios.get(`/admin/notifications/${pageParam}`));

export const getAdminNotificationDetails = async (id) =>
    handleAxiosRequest(axios.get(`/admin/notifications/${id}`));

export const markNotificationOpened = async (id) =>
    handleAxiosRequest(axios.patch(`/admin/notifications/${id}/mark-read`));
