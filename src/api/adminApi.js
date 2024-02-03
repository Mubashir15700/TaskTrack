import axios from "../config/axiosConfig";

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

export const getPlans = async (itemsPerPage, currentPage) => {
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
        return await axios.put(`/admin/edit-plan/${data._id}`, data);
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

export const getSubscriptions = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `/admin/subscriptions?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get subscriptions error: ", error);
        return error.response;
    }
};

export const getRequests = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `/admin/requests?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get requests error: ", error);
        return error.response;
    }
};

export const getRequest = async (data) => {
    try {
        return await axios.get(
            `/admin/request/${data}`
        );
    } catch (error) {
        console.log("get request error: ", error);
        return error.response;
    }
};

export const requestAction = async (id, type) => {
    try {
        return await axios.patch(`/admin/request-action/${id}`, type);
    } catch (error) {
        console.log("request action error: ", error);
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

export const updateBannerOrder = async (data) => {
    try {
        return await axios.patch("/admin/update-banner-order", { data });
    } catch (error) {
        console.log("update banner order error: ", error);
        return error.response;
    }
};

export const getAdminNotificationCount = async () => {
    try {
        return await axios.get("/admin/notifications-count");
    } catch (error) {
        console.log("get admin notifications count error: ", error);
        return error.response;
    }
};

export const getAdminNotifications = async () => {
    try {
        return await axios.get("/admin/notifications");
    } catch (error) {
        console.log("get admin notification error: ", error);
        return error.response;
    }
};

export const getAdminNotificationDetails = async (id) => {
    try {
        return await axios.get(`/admin/notification/${id}`);
    } catch (error) {
        console.log("get admin notification error: ", error);
        return error.response;
    }
};

export const markNotificationOpened = async (id) => {
    try {
        return await axios.patch(`/admin/notification/mark-read/${id}`);
    } catch (error) {
        console.log("mark admin notification read error: ", error);
        return error.response;
    }
};
