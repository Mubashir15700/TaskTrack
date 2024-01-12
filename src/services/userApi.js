import axios from "./axiosConfig";

export const getActiveBanners = async () => {
    try {
        return await axios.get(`/get-active-banners`);
    } catch (error) {
        console.log("get active banners error: ", error);
        return error.response;
    }
};

export const updateProfile = async (data, id) => {
    try {
        return await axios.put(`/update-profile?id=${id}`, data);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteUserProfileImage = async (id, image) => {
    try {
        return await axios.delete(`/delete-profile-image?id=${id}`, { image });
    } catch (error) {
        console.log("profile image delete error: ", error);
        return error.response;
    }
};

export const getCurrentLocation = async (data) => {
    try {
        return await axios.get(`/get-current-location`, { params: data });
    } catch (error) {
        console.log("get current location error: ", error);
        return error.response;
    }
};

export const deleteLocation = async (id) => {
    try {
        return await axios.delete(`/delete-current-location`, id);
    } catch (error) {
        console.log("get current location error: ", error);
        return error.response;
    }
};

export const getLaborers = async () => {
    try {
        return await axios.get(`/get-laborers`);
    } catch (error) {
        console.log("get laborers error: ", error);
        return error.response;
    }
};

export const getLaborer = async (data) => {
    try {
        return await axios.get(`/get-laborer/${data}`);
    } catch (error) {
        console.log("get laborer error: ", error);
        return error.response;
    }
};

export const getListedJobs = async (data) => {
    try {
        return await axios.get(`/get-listed-jobs/${data}`);
    } catch (error) {
        console.log("get listed jobs error: ", error);
        return error.response;
    }
};

export const getJobs = async () => {
    try {
        return await axios.get(`/get-jobs`);
    } catch (error) {
        console.log("get jobs error: ", error);
        return error.response;
    }
};

export const getJob = async (data) => {
    try {
        return await axios.get(`/get-job/${data}`);
    } catch (error) {
        console.log("get job error: ", error);
        return error.response;
    }
};

export const editJob = async (id, data) => {
    try {
        return await axios.put(`/edit-job/${id}`, data);
    } catch (error) {
        console.log("edit job error: ", error);
        return error.response;
    }
};

export const postNewJob = async (data) => {
    try {
        return await axios.post(`/post-job`, data);
    } catch (error) {
        console.log("post job error: ", error);
        return error.response;
    }
};

export const logout = async (data) => {
    try {
        return await axios.post(`/logout`, data);
    } catch (error) {
        console.log("logout error: ", error);
        return (error.response);
    }
};
