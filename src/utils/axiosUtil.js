const handleAxiosRequest = async (axiosPromise) => {
    try {
        const response = await axiosPromise;
        return response.data;
    } catch (error) {
        console.error("Axios request error:", error);
        throw error;
    }
};

export default handleAxiosRequest;
