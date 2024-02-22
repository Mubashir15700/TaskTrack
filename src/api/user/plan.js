import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getPlans = async () =>
    handleAxiosRequest(axios.get("/plans"));

export const getStripePublicKey = async () =>
    handleAxiosRequest(axios.get("/stripe-public-key"));

export const createSubscription = async (data) =>
    handleAxiosRequest(axios.post("/create-subscription", data));

export const saveSubscription = async () =>
    handleAxiosRequest(axios.post("/save-subscription-result"));

export const getActivePlan = async (subscriptionId) =>
    handleAxiosRequest(axios.get(`/active-plan?subscriptionId=${subscriptionId}`));

export const cancelActivePlan = async (data) =>
    handleAxiosRequest(axios.post("/cancel-active-plan", data));
