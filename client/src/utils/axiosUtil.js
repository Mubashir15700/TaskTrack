const handleAxiosRequest = async (axiosPromise) => {
    try {
        const response = await axiosPromise;
        return response.data;
    } catch (error) {
        console.error("Axios request error:", error.response?.data);
        throw error.response?.data;
    }
};

export default handleAxiosRequest;
