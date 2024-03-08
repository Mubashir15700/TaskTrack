import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const search = async (data, cancelToken) => {
    return handleAxiosRequest(axios.get("/shared/search", { params: data, cancelToken }));
};
