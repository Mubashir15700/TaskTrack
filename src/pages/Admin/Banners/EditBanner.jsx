import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getBanner, editBanner } from "../../../services/adminApi";
import ImageCrop from "../../../components/Common/ImageCrop";
import bannerSchema from "../../../validations/adminValidations/bannerSchema";

const EditBanner = () => {
    const [bannerData, setBannerData] = useState({});
    const [previewUrl, setPreviewUrl] = useState("");
    const [newImageSelected, setNewImageSelected] = useState(false);
    const [changed, setChanged] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getBannerDetails = async () => {
            try {
                // dispatch(setLoading(true));
                const response = await getBanner(id);
                if (response && response.data.status === "success" && response.data.banner) {
                    const banner = response.data.banner
                    setBannerData(banner);
                    setPreviewUrl(`http://localhost:3000/uploads/banner/${banner?.image}`)
                } else {
                    setErrors("Failed to fetch banner details.");
                }
            } catch (error) {
                setErrors("An error occurred while fetching banner details.");
                console.error("Error fetching banner details: ", error);
            } finally {
                // dispatch(setLoading(false));
            }
        };

        getBannerDetails();
    }, [id]);

    const handleInputChange = (e) => {
        setChanged(true);
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
        setChanged(true)
        setNewImageSelected(true);
        setBannerData({
            ...bannerData,
            image: file,
        });
    };

    const handleEditBanner = async () => {
        try {
            await bannerSchema.validate(bannerData, { abortEarly: false });
            setErrors({});

            const formData = new FormData();
            formData.append("id", bannerData._id);
            formData.append("title", bannerData.title);
            formData.append("description", bannerData.description);
            formData.append("image", bannerData.image);

            const response = await editBanner(formData);

            if (response) {
                setServerResponse(response.data);
            }
            if (response.data.status === "success") {
                navigate("/admin/banners");
                toast.success("Edited banner successfully");
            } else {
                toast.error(response?.data?.message || "An error occurred during editing banner");
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                setServerResponse({ status: "failed", message: "An error occurred during editing banner" });
            }
        }
    };

    return (
        <div className="col-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
            <h5 className="mb-3">Edit Banner</h5>
                <div className="col-md-12">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={bannerData?.title}
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
                        value={bannerData?.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <span className="error-display">{errors.description}</span>}
                </div>
                {(bannerData.image && !newImageSelected) && (
                    <div className="col-md-12">
                        <img
                            src={previewUrl}
                            className="my-3 img-fluid"
                            style={{
                                height: '200px',
                                width: '300px',
                            }}
                        />
                        {errors.image && <span className="error-display">{errors.image}</span>}
                    </div>
                )}
                <div className="col-md-12">
                    <ImageCrop onNewImageUrl={addCropImage} purpose={'banner'} />
                    {errors.image && <span className="error-display">{errors.image}</span>}
                </div>
                {changed && (
                    <button
                        className={`btn btn-primary mt-3`}
                        onClick={handleEditBanner}
                    >
                        Edit Banner
                    </button>
                )}
                {serverResponse && (
                    <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                        {serverResponse.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditBanner;
