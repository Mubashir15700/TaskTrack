import axios from "../configs/axiosConfig";
import handleAxiosRequest from "../utils/axiosUtil";

export const checkAuth = async (data) =>
    handleAxiosRequest(axios.get(`/auth/checkauth`, { params: data }), "check auth error: ");

export const login = async (data) =>
    handleAxiosRequest(axios.post(`/auth/login`, data), "login error: ");

export const userSignUp = async (data) =>
    handleAxiosRequest(axios.post(`/auth/sign-up`, data), "sign-up error: ");

export const verifyOtp = async (data) =>
    handleAxiosRequest(axios.post(`/auth/verify-otp`, data), "verify otp error: ");

export const resendOtp = async (data) =>
    handleAxiosRequest(axios.post(`/auth/resend-otp`, data), "resend otp error: ");

export const confirmEmail = async (data) =>
    handleAxiosRequest(axios.post(`/auth/confirm-email`, data), "confirm email error: ");

export const resetPassword = async (data) =>
    handleAxiosRequest(axios.post(`/auth/reset-password`, data), "reset password error: ");

export const logout = async (data) =>
    handleAxiosRequest(axios.post(`/auth/logout`, data), "logout error: ");
