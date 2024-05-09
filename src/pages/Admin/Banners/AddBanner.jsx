import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addBanner } from "../../../api/admin/banner";
import BannerForm from "../../../components/Admin/BannerForm";
import bannerSchema from "../../../utils/validations/adminValidations/bannerSchema";

const AddBanner = () => {
    const navigate = useNavigate();

    const [bannerData, setBannerData] = useState({
        title: "",
        description: "",
        image: "",
    });
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const handleInputChange = (e) => {
        setServerResponse("");
        const { name, value } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
        setBannerData({
            ...bannerData,
            [name]: value,
        });
    };

    const addCropImage = (file) => {
        setBannerData({
            ...bannerData,
            image: file,
        });
    };

    const handleAddBanner = async () => {
        try {
            await bannerSchema.validate(bannerData, { abortEarly: false, context: { isEdit: false } });
            setErrors({});

            const formData = new FormData();
            formData.append("title", bannerData.title);
            formData.append("description", bannerData.description);
            formData.append("image", bannerData.image);

            const response = await addBanner(formData);
            if (response) {
                setServerResponse(response);
                if (response.status === 200) {
                    navigate("/admin/banners");
                    toast.success("Added new banner successfully");
                } else {
                    toast.error(response?.message || "An error occurred during adding banner");
                }
            }
        } catch (error) {
            console.log(error);
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                setServerResponse({ status: "failed", message: "An error occurred during adding banner" });
            }
        }
    };

    const BannerFormProps = {
        title: "Add Banner",
        bannerData: bannerData,
        handleInputChange: handleInputChange,
        newImageSelected: false,
        addCropImage: addCropImage,
        changed: true,
        handleSubmit: handleAddBanner,
        serverResponse: serverResponse,
        errors: errors,
    };

    return (
        <BannerForm {...BannerFormProps} />
    );
};

export default AddBanner;
