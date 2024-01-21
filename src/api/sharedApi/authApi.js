import axios from "../../config/axiosConfig";

export const checkAuth = async (data) => {
    try {
        return await axios.get(`/auth/checkauth`, { params: data });
    } catch (error) {
        console.log("check auth error: ", error);
        return error.response;
    }
};

export const adminLogin = async (data) => {
    try {
        return await axios.post(`/admin/login`, data);
    } catch (error) {
        console.log("admin login error: ", error);
        return error.response;
    }
};

export const userLogin = async (data) => {
    try {
        return await axios.post(`/login`, data);
    } catch (error) {
        console.log("user login error: ", error);
        return error.response;
    }
};

export const userSignUp = async (data) => {
    try {
        return await axios.post(`/sign-up`, data);
    } catch (error) {
        console.log("sign-up error: ", error);
        return error.response;
    }
};

export const verifyOtp = async (data) => {
    try {
        return await axios.post(`/verify-otp`, data);
    } catch (error) {
        console.log("verify otp error: ", error);
        return error.response;
    }
};

export const resendOtp = async (data) => {
    try {
        return await axios.post(`/resend-otp`, data);
    } catch (error) {
        console.log("resend otp error: ", error);
        return error.response;
    }
};

export const confirmEmail = async (data) => {
    try {
        return await axios.post(`/confirm-email`, data);
    } catch (error) {
        console.log("confirm email error: ", error);
        return error.response;
    }
};

export const resetPassword = async (data) => {
    try {
        return await axios.post(`/reset-password`, data);
    } catch (error) {
        console.log("reset password error: ", error);
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
