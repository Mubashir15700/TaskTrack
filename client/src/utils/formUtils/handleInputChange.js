export const handleInputChange = (e, formData, setFormData, setServerResponse, setErrors) => {
    setServerResponse("");
    const { name, value } = e.target;
    if (setErrors) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
    setFormData({
        ...formData,
        [name]: value
    });
};

export default handleInputChange;
