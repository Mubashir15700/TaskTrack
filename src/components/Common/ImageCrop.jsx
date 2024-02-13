import { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCrop({ onNewImageUrl, purpose }) {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [cropper, setCropper] = useState();
    const [cropperVisible, setCropperVisible] = useState(false);

    function getNewImageUrl(e) {
        if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setCropperVisible(true);
        }
    };

    const getCropData = async (e) => {
        e.preventDefault()
        if (cropper) {
            const file = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    const nameSuffix = purpose === "profile" ? "profile" : "banner";
                    return new File([blob], `${nameSuffix}.png`, {
                        type: "image/png"
                    });
                });
            if (file) {
                const url = URL.createObjectURL(file);
                setPreview(url);
                onNewImageUrl(file);
                setCropperVisible(false);
            }
        }
    };

    const handleCancelClick = () => {
        setCropperVisible(false);
    };

    const CropperProps = {
        src: image,
        style: { height: 400, width: 400 },
        initialAspectRatio: 4 / 3,
        minCropBoxHeight: 100,
        minCropBoxWidth: 100,
        guides: false,
        checkOrientation: false,
        onInitialized: (instance) => {
            setCropper(instance);
        }
    };

    return (
        <>
            <div>
                <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-600"
                >
                </label>
                {preview && (
                    <img
                        src={preview}
                        className="preview rounded-3 mb-2"
                        style={{
                            height: purpose === "profile" ? "150px" : "200px",
                            width: purpose === "profile" ? "150px" : "300px",
                        }}
                    />
                )}
                <input
                    type="file"
                    id="upload"
                    className="form-control my-2"
                    name={purpose === "profile" ? "profile" : "banner"}
                    accept="image/*"
                    onChange={getNewImageUrl}
                />
            </div>
            {image && cropperVisible && (
                <>
                    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                    <div className="d-flex flex-column align-items-center">
                        <Cropper {...CropperProps} />
                        <div className="position-absolute bottom-0 start-50 translate-middle-x">
                            <button className="btn btn-danger me-2">
                                <i
                                    className="bi bi-x-circle text-white cursor-pointer"
                                    style={{ zIndex: 1001, cursor: "pointer" }}
                                    onClick={handleCancelClick}
                                />
                            </button>
                            <button className="btn btn-primary me-2">
                                <i
                                    className="bi bi-crop text-white me-2"
                                    style={{ zIndex: 1001, cursor: "pointer" }}
                                    onClick={getCropData}
                                />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ImageCrop;
