import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getDashboardData = async () =>
    handleAxiosRequest(axios.get("/admin/dashboard"));
