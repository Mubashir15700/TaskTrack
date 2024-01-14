import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addBanner } from "../../../services/adminApi";
import ImageCrop from "../../../components/Common/ImageCrop";
import bannerSchema from "../../../validations/adminValidations/bannerSchema";

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
            await bannerSchema.validate(bannerData, { abortEarly: false });
            setErrors({});

            const formData = new FormData();
            formData.append("title", bannerData.title);
            formData.append("description", bannerData.description);
            formData.append("image", bannerData.image);

            const response = await addBanner(formData);
            if (response) {
                setServerResponse(response.data);
                if (response.data.status === "success") {
                    navigate("/admin/banners");
                    toast.success("Added new banner successfully");
                } else {
                    toast.error(response?.data?.message || "An error occurred during adding banner");
                }
            }
        } catch (error) {
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

    return (
        <div className="col-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <h5 className="mb-3">Add Banner</h5>
                <div className="col-md-12">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={handleInputChange}
                    />
                    {errors.title && <span className="error-display">{errors.title}</span>}
                </div>
                <div className="col-md-12">
                    <label>Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={handleInputChange}
                    />
                    {errors.description && <span className="error-display">{errors.description}</span>}
                </div>
                <div className="col-md-12">
                    <ImageCrop onNewImageUrl={addCropImage} purpose={"banner"} />
                    {errors.image && <span className="error-display">{errors.image}</span>}
                </div>
                <button
                    className={`btn btn-primary mt-3`}
                    onClick={handleAddBanner}
                >
                    Add Banner
                </button>
                {serverResponse && (
                    <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                        {serverResponse.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddBanner;
