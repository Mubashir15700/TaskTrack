import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getActiveBanners = async () => {
    return handleAxiosRequest(axios.get("/banners"));
};

export const getChatLists = async () => {
    return handleAxiosRequest(axios.get("/chats"));
};

export const updateMessagesReadStatus = async (ids) => {
    return handleAxiosRequest(axios.patch(`/messages/mark-read/`, ids));
};
