import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const updateProfile = async (data, id) =>
    handleAxiosRequest(axios.put(`/update-profile?id=${id}`, data));

export const deleteUserProfileImage = async (id, image) =>
    handleAxiosRequest(axios.delete(`/delete-profile-image?id=${id}&image=${image}`));

export const getCurrentLocation = async (data) =>
    handleAxiosRequest(axios.get("/current-location", { params: data }));

export const deleteLocation = async (id) =>
    handleAxiosRequest(axios.delete(`/delete-current-location/${id}`));

export const updateLaborerProfile = async (data) =>
    handleAxiosRequest(axios.put("/update-laborer-profile", data));
