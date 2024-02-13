import axios from "../../config/axiosConfig";
import handleAxiosRequest from "../../utils/axiosUtil";

export const getJobs = async (userId, pageParam, lat = null, lon = null) =>
    handleAxiosRequest(axios.get(`/jobs/${userId}/${pageParam}`, { params: { lat, lon } }));

export const getJob = async (data) => handleAxiosRequest(axios.get(`/job/${data}`));

export const applyJob = async (data) => handleAxiosRequest(axios.post("/apply-job", data));

export const cancelApplication = async (data) => handleAxiosRequest(axios.post(
    "/cancel-job-application",
    data
));

export const getRemainingPosts = async (userId) => handleAxiosRequest(axios.get(
    `/remaining-posts?userId=${userId}`
));

export const postNewJob = async (data) => handleAxiosRequest(axios.post("/post-job", data));

export const getListedJobs = async (userId, pageParam) => handleAxiosRequest(axios.get(
    `/listed-jobs/${userId}/${pageParam}`
));

export const getListedJob = async (data) => handleAxiosRequest(axios.get(
    `/listed-job/${data}`
));

export const updateListedJob = async (data) => handleAxiosRequest(axios.put(
    `/edit-listed-job`,
    data
));

export const deleteListedJob = async (data) => handleAxiosRequest(axios.delete(
    `/delete-listed-job/${data}`
));

export const getApplicants = async (data) => handleAxiosRequest(axios.get(
    `/applicants/${data.jobId}/${data.fieldName}`
));

export const applicantAction = async (data) => handleAxiosRequest(axios.patch(
    "/applicant-action",
    data
));

export const getWorksHistory = async (userId, pageParam) => handleAxiosRequest(axios.get(
    `/works-history/${userId}/${pageParam}`
));
