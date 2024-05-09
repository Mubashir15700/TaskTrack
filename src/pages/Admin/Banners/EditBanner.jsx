import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getBanner, editBanner } from "../../../api/admin/banner";
import BannerForm from "../../../components/Admin/BannerForm";
import bannerSchema from "../../../utils/validations/adminValidations/bannerSchema";

const EditBanner = () => {
    const [bannerData, setBannerData] = useState({
        title: "",
        description: "",
        image: "",
    });
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
                const response = await getBanner(id);
                if (response && response.status === 200 && response.banner) {
                    const banner = response.banner;
                    setBannerData(banner);
                    setPreviewUrl(banner.image)
                } else {
                    setErrors("Failed to fetch banner details.");
                }
            } catch (error) {
                setErrors("An error occurred while fetching banner details.");
                console.error("Error fetching banner details: ", error);
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
            if (!newImageSelected) {
                // If no new image is selected, remove the existing image from the banner data
                delete bannerData.image;
            }
            
            await bannerSchema.validate(bannerData, { abortEarly: false, context: { isEdit: true } });
            
            setErrors({});

            const formData = new FormData();
            formData.append("id", bannerData._id);
            formData.append("title", bannerData.title);
            formData.append("description", bannerData.description);
            formData.append("image", bannerData.image);

            const response = await editBanner(formData, newImageSelected);

            if (response) {
                setServerResponse(response);
            }
            if (response.status === 200) {
                navigate("/admin/banners");
                toast.success("Edited banner successfully");
            } else {
                toast.error(response?.message || "An error occurred during editing banner");
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
                setServerResponse({ status: "failed", message: "An error occurred during editing banner" });
            }
        }
    };

    const BannerFormProps = {
        title: "Edit Banner",
        bannerData: bannerData,
        handleInputChange: handleInputChange,
        newImageSelected: newImageSelected,
        previewUrl: previewUrl,
        addCropImage: addCropImage,
        changed: changed,
        handleSubmit: handleEditBanner,
        serverResponse: serverResponse,
        errors: errors,
    };

    return (
        <BannerForm {...BannerFormProps} />
    );
};

export default EditBanner;
