import ImageCrop from "../ImageCrop";
import FormErrorDisplay from "../FormErrorDisplay";

const BannerForm = ({
    title,
    bannerData,
    handleInputChange,
    newImageSelected,
    previewUrl,
    addCropImage,
    changed,
    handleSubmit,
    serverResponse,
    errors
}) => {
    return (
        <div className="col-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <h5 className="mb-3">{title}</h5>
                <div className="col-md-12">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={bannerData?.title}
                        onChange={handleInputChange}
                    />
                    <FormErrorDisplay error={errors.title} />
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
                    <FormErrorDisplay error={errors.description} />
                </div>
                {(bannerData.image && !newImageSelected && previewUrl) && (
                    <div className="col-md-12">
                        <img
                            src={previewUrl}
                            className="my-3 img-fluid"
                            style={{
                                height: "200px",
                                width: "300px",
                            }}
                        />
                    </div>
                )}
                <div className="col-md-12">
                    <ImageCrop onNewImageUrl={addCropImage} purpose={"banner"} />
                </div>
                <FormErrorDisplay error={errors.image} />
                {changed && (
                    <button
                        className={`btn btn-primary mt-3`}
                        onClick={handleSubmit}
                    >
                        {title}
                    </button>
                )}
                {serverResponse && (
                    <div className={`alert ${serverResponse.status !== 200 ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                        {serverResponse.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerForm;
