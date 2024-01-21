import axios from "../../config/axiosConfig";

export const search = async (data) => {
    try {
        return await axios.get(`/utility/search`, { params: data });
    } catch (error) {
        console.log("search error: ", error);
        return error.response;
    }
};
