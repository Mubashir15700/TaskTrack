const handleFormErrors = (error, setErrors, setServerResponse) => {
    if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
    } else {
        console.error("Error:", error);
        setServerResponse({ status: "failed", message: error.message });
    }
};

export default handleFormErrors;
