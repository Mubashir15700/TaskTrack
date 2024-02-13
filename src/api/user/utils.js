import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getActiveBanners = async () => {
    return handleAxiosRequest(axios.get("/banners"));
};

export const updateMessagesReadStatus = async (ids) => {
    return handleAxiosRequest(axios.patch(`/messages/mark-read/`, ids));
};
