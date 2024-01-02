import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCrop({ onNewImageUrl }) {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [cropper, setCropper] = useState();
    const [cropperVisible, setCropperVisible] = useState(false);

    const inputRef = useRef(null);

    const handleIconClick = () => {
        inputRef.current.click();
    };

    function getNewAvatarUrl(e) {
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
                    return new File([blob], "newAvatar.png", {
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
                        className="preview rounded-3"
                        style={{ height: '150px', width: '150px' }}
                    />
                )}
                <i
                    className="bi bi-pencil-square"
                    style={{ cursor: 'pointer' }}
                    onClick={handleIconClick}
                />
                <input
                    type="file"
                    id="upload"
                    name="profile"
                    accept="image/*"
                    onChange={getNewAvatarUrl}
                    ref={inputRef}
                    style={{ display: 'none' }}
                />
            </div>
            {image && cropperVisible && (
                <>
                    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                    <Cropper
                        src={image}
                        style={{ height: 400, width: 400 }}
                        initialAspectRatio={4 / 3}
                        minCropBoxHeight={100}
                        minCropBoxWidth={100}
                        guides={false}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                    />
                    <div className="position-absolute top-2 start-2 mt-1">
                        <button className="btn btn-danger me-2">
                            <i
                                className="bi bi-x-circle text-white cursor-pointer"
                                style={{ zIndex: 1001, cursor: 'pointer' }}
                                onClick={handleCancelClick}
                            />
                        </button>
                        <button className="btn btn-primary me-2">
                            <i
                                className="bi bi-crop text-white me-2"
                                style={{ zIndex: 1001, cursor: 'pointer' }}
                                onClick={getCropData}
                            />
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ImageCrop;