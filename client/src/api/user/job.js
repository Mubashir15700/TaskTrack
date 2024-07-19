import axios from "../../configs/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getJobs = async (userId, pageParam, lat = null, lon = null) =>
    handleAxiosRequest(axios.get(`/jobs/${userId}/${pageParam}`, { params: { lat, lon } }));

export const getJob = async (id) => handleAxiosRequest(axios.get(`/jobs/${id}`));

export const applyJob = async (data) => handleAxiosRequest(axios.post("/jobs/apply", data));

export const cancelApplication = async (data) => handleAxiosRequest(axios.post(
    "/jobs/cancel-application",
    data
));

export const getRemainingPosts = async (userId) => handleAxiosRequest(axios.get(
    `/jobs/posts/remaining?userId=${userId}`
));

export const postNewJob = async (data) => handleAxiosRequest(axios.post("/jobs/posts/new", data));

export const getListedJobs = async (id, pageParam) => handleAxiosRequest(axios.get(
    `/jobs/listed/${id}/${pageParam}`
));

export const getListedJob = async (id) => handleAxiosRequest(axios.get(
    `/jobs/listed/${id}`
));

export const updateListedJob = async (data) => handleAxiosRequest(axios.put(
    `/jobs/listed/edit`,
    data
));

export const deleteListedJob = async (id) => handleAxiosRequest(axios.delete(
    `/jobs/listed/${id}/delete`
));

export const getApplicants = async (data) => handleAxiosRequest(axios.get(
    `/jobs/applicants/${data.jobId}/${data.fieldName}`
));

export const applicantAction = async (data) => handleAxiosRequest(axios.patch(
    "/jobs/applicant-action",
    data
));

export const getWorksHistory = async (userId, pageParam) => handleAxiosRequest(axios.get(
    `/jobs/works-history/${userId}/${pageParam}`
));
