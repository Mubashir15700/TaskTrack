import axios from "axios";

axios.defaults.withCredentials = true;

const URL = 'http://localhost:3000';

export const checkAuth = async (data) => {
    try {
        return await axios.post(`${URL}/auth/checkauth`, data);
    } catch (error) {
        console.log("check auth error: ", error);
        return error.response;
    }
};

// Admin
export const adminLogin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/login`, data);
    } catch (error) {
        console.log("admin login error: ", error);
        return error.response;
    }
};

export const getUsers = async (itemsPerPage, currentPage) => {
    try {
        return await axios.get(
            `${URL}/admin/users?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
    } catch (error) {
        console.log("get users error: ", error);
        return error.response;
    }
};

export const getUser = async (data) => {
    try {
        return await axios.get(`${URL}/admin/user/${data}`);
    } catch (error) {
        console.log("get user error: ", error);
        return error.response;
    }
};

export const userAction = async (data) => {
    try {
        return await axios.post(`${URL}/admin/user-action/${data}`);
    } catch (error) {
        console.log("user action error: ", error);
        return error.response;
    }
};

// User
export const userLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log("user login error: ", error);
        return error.response;
    }
};

export const userSignUp = async (data) => {
    try {
        return await axios.post(`${URL}/sign-up`, data);
    } catch (error) {
        console.log("sign-up error: ", error);
        return error.response;
    }
};

export const verifyOtp = async (data) => {
    try {
        return await axios.post(`${URL}/verify-otp`, data);
    } catch (error) {
        console.log("verify otp error: ", error);
        return error.response;
    }
};

export const resendOtp = async (data) => {
    try {
        return await axios.post(`${URL}/resend-otp`, data);
    } catch (error) {
        console.log("resend otp error: ", error);
        return error.response;
    }
};

export const confirmEmail = async (data) => {
    try {
        return await axios.post(`${URL}/confirm-email`, data);
    } catch (error) {
        console.log("confirm email error: ", error);
        return error.response;
    }
};

export const resetPassword = async (data) => {
    try {
        return await axios.post(`${URL}/reset-password`, data);
    } catch (error) {
        console.log("reset password error: ", error);
        return error.response;
    }
};

export const logout = async (data) => {
    try {
        return await axios.post(`${URL}/logout`, data);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};