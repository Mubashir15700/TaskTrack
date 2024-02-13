import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getBanners = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/banners?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));

export const getBanner = async (data) =>
    handleAxiosRequest(axios.get(`/admin/banner/${data}`));

export const addBanner = async (data) =>
    handleAxiosRequest(axios.post(`/admin/add-banner`, data));

export const editBanner = async (data) =>
    handleAxiosRequest(axios.put(`/admin/edit-banner/${data._id}`, data));

export const bannerAction = async (data) =>
    handleAxiosRequest(axios.patch(`/admin/banner-action/${data}`));

export const updateBannerOrder = async (data) =>
    handleAxiosRequest(axios.patch("/admin/update-banner-order", { data }));
