import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getBanner, editBanner } from "../../../api/adminApi";
import BannerForm from "../../../components/Admin/BannerForm";
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
        <BannerForm
            title={"Edit Banner"}
            bannerData={bannerData}
            handleInputChange={handleInputChange}
            newImageSelected={newImageSelected}
            previewUrl={previewUrl}
            addCropImage={addCropImage}
            changed={changed}
            handleSubmit={handleEditBanner}
            serverResponse={serverResponse}
            errors={errors}
        />
    );
};

export default EditBanner;
