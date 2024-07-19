import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getBanners = async (itemsPerPage, currentPage) =>
    handleAxiosRequest(axios.get(
        `/admin/banners?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
    ));

export const getBanner = async (id) =>
    handleAxiosRequest(axios.get(`/admin/banners/${id}`));

export const addBanner = async (data) =>
    handleAxiosRequest(axios.post(`/admin/banners/add-banner`, data));

export const editBanner = async (data, newImageSelected) =>
    handleAxiosRequest(axios.put(`/admin/banners/${data._id}/edit-banner?newImageSelected=${newImageSelected}`, data));

export const bannerAction = async (id) =>
    handleAxiosRequest(axios.patch(`/admin/banners/${id}/list-unlist`));

export const updateBannerOrder = async (data) =>
    handleAxiosRequest(axios.patch("/admin/banners/update-order", { data }));
