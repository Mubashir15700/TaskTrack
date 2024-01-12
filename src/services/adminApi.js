import axios from "./axiosConfig";

export const search = async (data) => {
    try {
        return await axios.get(`/admin/search`, { params: data });
    } catch (error) {
        console.log("search error: ", error);
        return error.response;
    }
};

export const getUsers = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `/admin/users?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get users error: ", error);
        return error.response;
    }
};

export const getUser = async (data) => {
    try {
        return await axios.get(`/admin/user/${data}`);
    } catch (error) {
        console.log("get user error: ", error);
        return error.response;
    }
};

export const userAction = async (data) => {
    try {
        return await axios.patch(`/admin/user-action/${data}`);
    } catch (error) {
        console.log("user action error: ", error);
        return error.response;
    }
};

export const getBanners = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `/admin/banners?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get banner error: ", error);
        return error.response;
    }
};

export const getBanner = async (data) => {
    try {
        return await axios.get(`/admin/banner/${data}`);
    } catch (error) {
        console.log("get banner error: ", error);
        return error.response;
    }
};

export const addBanner = async (data) => {
    try {
        return await axios.post(`/admin/add-banner`, data);
    } catch (error) {
        console.log("add banner error: ", error);
        return error.response;
    }
};

export const editBanner = async (data) => {
    try {
        return await axios.put(`/admin/edit-banner/${data._id}`, data);
    } catch (error) {
        console.log("edit banner error: ", error);
        return error.response;
    }
};

export const bannerAction = async (data) => {
    try {
        return await axios.patch(`/admin/banner-action/${data}`);
    } catch (error) {
        console.log("banner action error: ", error);
        return error.response;
    }
};

export const getplans = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `/admin/plans?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get plans error: ", error);
        return error.response;
    }
};

export const getPlan = async (data) => {
    try {
        return await axios.get(`/admin/plan/${data}`);
    } catch (error) {
        console.log("get plan error: ", error);
        return error.response;
    }
};

export const addPlan = async (data) => {
    try {
        return await axios.post(`/admin/add-plan`, data);
    } catch (error) {
        console.log("add plan error: ", error);
        return error.response;
    }
};

export const editPlan = async (data) => {
    try {
        return await axios.put(`/admin/edit-plan/${data}`);
    } catch (error) {
        console.log("edit plan error: ", error);
        return error.response;
    }
};

export const planAction = async (data) => {
    try {
        return await axios.patch(`/admin/plan-action/${data}`);
    } catch (error) {
        console.log("plan action error: ", error);
        return error.response;
    }
};
