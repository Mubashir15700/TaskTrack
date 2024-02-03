import axios from "../../config/axiosConfig";

export const checkAuth = async (data) => {
    try {
        return await axios.get(`/auth/checkauth`, { params: data });
    } catch (error) {
        console.log("check auth error: ", error.message);
        return error.response;
    }
};

export const login = async (data) => {
    try {
        return await axios.post(`/auth/login`, data);
    } catch (error) {
        console.log("login error: ", error);
        return error.response;
    }
};

export const userSignUp = async (data) => {
    try {
        return await axios.post(`/auth/sign-up`, data);
    } catch (error) {
        console.log("sign-up error: ", error);
        return error.response;
    }
};

export const verifyOtp = async (data) => {
    try {
        return await axios.post(`/auth/verify-otp`, data);
    } catch (error) {
        console.log("verify otp error: ", error);
        return error.response;
    }
};

export const resendOtp = async (data) => {
    try {
        return await axios.post(`/auth/resend-otp`, data);
    } catch (error) {
        console.log("resend otp error: ", error);
        return error.response;
    }
};

export const confirmEmail = async (data) => {
    try {
        return await axios.post(`/auth/confirm-email`, data);
    } catch (error) {
        console.log("confirm email error: ", error);
        return error.response;
    }
};

export const resetPassword = async (data) => {
    try {
        return await axios.post(`/auth/reset-password`, data);
    } catch (error) {
        console.log("reset password error: ", error);
        return error.response;
    }
};

export const logout = async (data) => {
    try {
        return await axios.post(`/auth/logout`, data);
    } catch (error) {
        console.log("logout error: ", error);
        return (error.response);
    }
};
