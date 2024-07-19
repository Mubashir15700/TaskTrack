import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

// Add a response interceptor
axios.interceptors.response.use(
    response => response, // Simply return the response data
    error => {
        // Check for specific error messages and handle accordingly
        const errorMessage = error?.response?.data?.message;

        if (!error.response) {
            // Handle network errors
            if (error.message === "Network Error") {
                toast.error("Network Error", {
                    duration: 8000,
                });
            } else {
                console.error("An unknown network error occurred:", error.message);
                toast.error("An unknown network error occurred. Please try again.", {
                    duration: 8000
                });
            }
        } else if (
            errorMessage === "Unauthorized - User is blocked" ||
            errorMessage === "Unauthorized - Token expired" ||
            errorMessage === "Unauthorized - Missing JWT"
        ) {
            window.location.href = "/login";
        } else if (error.code === "ECONNABORTED") {
            // Handle request timeout
            console.error("Request Timeout:", error.message);
            toast.error("Request Timeout: The request took too long to complete. Please try again.", {
                duration: 8000
            });
        }

        return Promise.reject(error); // Reject the promise to prevent further processing
    }
);

export default axios;
