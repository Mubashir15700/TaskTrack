import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

// Add a response interceptor
axios.interceptors.response.use(
    response => response, // Simply return the response data
    error => {
        const errorMessage = error?.response?.data?.message;

        // Check for specific error messages and handle accordingly
        if (
            errorMessage === "Unauthorized - User is blocked" ||
            errorMessage === "Unauthorized - Token expired" ||
            errorMessage === "Unauthorized - Missing JWT"
        ) {
            window.location.href = "/login";
        }

        return Promise.reject(error); // Reject the promise to prevent further processing
    }
);

export default axios;
