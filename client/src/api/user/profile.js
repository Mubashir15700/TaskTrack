import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const updateProfile = async (data, id) =>
    handleAxiosRequest(axios.put(`/profile/update?id=${id}`, data));

export const deleteUserProfileImage = async (id, image) =>
    handleAxiosRequest(axios.delete(`/profile/delete-image?id=${id}&image=${image}`));

export const getCurrentLocation = async (data) =>
    handleAxiosRequest(axios.get("/profile/current-location", { params: data }));

export const deleteLocation = async (id) =>
    handleAxiosRequest(axios.delete(`/profile/${id}/delete-current-location`));

export const updateLaborerProfile = async (data) =>
    handleAxiosRequest(axios.put("/profile/update-laborer", data));
