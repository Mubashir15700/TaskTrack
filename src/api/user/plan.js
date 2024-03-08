import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getPlans = async () =>
    handleAxiosRequest(axios.get("/plans"));

export const getStripePublicKey = async () =>
    handleAxiosRequest(axios.get("/subscription/stripe-public-key"));

export const createSubscription = async (data) =>
    handleAxiosRequest(axios.post("/subscription/create", data));

export const saveSubscription = async () =>
    handleAxiosRequest(axios.post("/subscription/save"));

export const getActivePlan = async (subscriptionId) =>
    handleAxiosRequest(axios.get(`/subscription/active-plan?subscriptionId=${subscriptionId}`));
