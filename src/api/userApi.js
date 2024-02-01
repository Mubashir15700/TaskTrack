import axios from "../config/axiosConfig";

export const getActiveBanners = async () => {
    try {
        return await axios.get(`/get-active-banners`);
    } catch (error) {
        console.log("get active banners error: ", error);
        return error.response;
    }
};

// profile
export const updateProfile = async (data, id) => {
    try {
        return await axios.put(`/update-profile?id=${id}`, data);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateLaborerProfile = async (data) => {
    try {
        return await axios.put("/update-laborer-profile", { data });
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteUserProfileImage = async (id, image) => {
    try {
        return await axios.delete(`/delete-profile-image?id=${id}&image=${image}`);
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
        return await axios.delete(`/delete-current-location/${id}`);
    } catch (error) {
        console.log("delete current location error: ", error);
        return error.response;
    }
};

// laborers
export const getLaborers = async (currentUserId) => {
    try {
        return await axios.get(`/get-laborers?userId=${currentUserId}`);
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

export const sendRequest = async (data) => {
    try {
        return await axios.post(`/send-request`, data);
    } catch (error) {
        console.log("send request error: ", error);
        return error.response;
    }
};

export const getPrevRequest = async (data) => {
    try {
        return await axios.get(`/get-prev-request/${data}`);
    } catch (error) {
        console.log("get prev request error: ", error);
        return error.response;
    }
};

export const updateRequest = async (data) => {
    try {
        return await axios.put(`/update-request`, data);
    } catch (error) {
        console.log("update request error: ", error);
        return error.response;
    }
};

export const cancelRequest = async (data) => {
    try {
        return await axios.patch(`/cancel-request`, data);
    } catch (error) {
        console.log("cancel request error: ", error);
        return error.response;
    }
};

// jobs
export const getJobs = async (data) => {
    try {
        return await axios.get(`/get-jobs`, { params: data });
    } catch (error) {
        console.log("get jobs error: ", error);
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

export const getJob = async (data) => {
    try {
        return await axios.get(`/get-job/${data}`);
    } catch (error) {
        console.log("get job error: ", error);
        return error.response;
    }
};

export const applyJob = async (data) => {
    try {
        return await axios.post("/apply-job", data);
    } catch (error) {
        console.log("apply job error: ", error);
        return error.response;
    }
};

export const cancelApplication = async (data) => {
    try {
        return await axios.post("/cancel-job-application", data);
    } catch (error) {
        console.log("cancel job application error: ", error);
        return error.response;
    }
};

export const getListedJob = async (data) => {
    try {
        return await axios.get(`/get-listed-job/${data}`);
    } catch (error) {
        console.log("get listed job error: ", error);
        return error.response;
    }
};

export const getApplicants = async (data) => {
    try {
        return await axios.get(`/get-applicants/${data.jobId}/${data.fieldName}`);
    } catch (error) {
        console.log("get listed job error: ", error);
        return error.response;
    }
};

export const applicantAction = async (data) => {
    try {
        return await axios.patch("/applicant-action", data);
    } catch (error) {
        console.log("take applicant action error: ", error);
        return error.response;
    }
};

export const getWorksHistory = async (data) => {
    try {
        return await axios.get(`/get-works-history/${data}`);
    } catch (error) {
        console.log("get works history error: ", error);
        return error.response;
    }
};

export const updateListedJob = async (data) => {
    try {
        return await axios.put(`/edit-listed-job`, data);
    } catch (error) {
        console.log("edit listed job error: ", error);
        return error.response;
    }
};

export const deleteListedJob = async (data) => {
    try {
        return await axios.delete(`/delete-listed-job/${data}`);
    } catch (error) {
        console.log("delete listed job error: ", error);
        return error.response;
    }
};

export const getRemainingPosts = async (userId) => {
    try {
        return await axios.get(`/get-remainig-posts?userId=${userId}`);
    } catch (error) {
        console.log("get remaining post's count error: ", error);
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

export const getUserNotificationCount = async (id) => {
    try {
        return await axios.get(`/notifications-count/${id}`);
    } catch (error) {
        console.log("get user notifications count error: ", error);
        return error.response;
    }
};

export const getUserNotifications = async (id) => {
    try {
        return await axios.get(`/notifications/${id}`);
    } catch (error) {
        console.log("get user notifications error: ", error);
        return error.response;
    }
};

export const getUserNotificationDetails = async (id) => {
    try {
        return await axios.get(`/notification/${id}`);
    } catch (error) {
        console.log("get user notification error: ", error);
        return error.response;
    }
};

export const markNotificationOpened = async (id) => {
    try {
        return await axios.patch(`/notification/mark-read/${id}`);
    } catch (error) {
        console.log("mark user notification read error: ", error);
        return error.response;
    }
};

export const getPlans = async () => {
    try {
        return await axios.get("/plans");
    } catch (error) {
        console.log("get plans error: ", error);
        return error.response;
    }
};

export const createSubscription = async (data) => {
    try {
        return await axios.post("/create-subscription", data);
    } catch (error) {
        console.log("create subscription error: ", error);
        return error.response;
    }
};

export const saveSubscription = async () => {
    try {
        return await axios.post("/save-subscription-result");
    } catch (error) {
        console.log("save subscription error: ", error);
        return error.response;
    }
};

export const getActivePlan = async (data) => {
    try {
        return await axios.get(`/get-active-plan?subscriptionId=${data}`);
    } catch (error) {
        console.log("get active plan error: ", error);
        return error.response;
    }
};

export const cancelActivePlan = async (data) => {
    try {
        return await axios.post("/cancel-active-plan", data);
    } catch (error) {
        console.log("cancel active plan error: ", error);
        return error.response;
    }
};
