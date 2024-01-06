import { useState } from "react";

const EditBanner = () => {
    const [bannerData, setBannerData] = useState({
        title: '',
        description: '',
        image: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBannerData({
            ...bannerData,
            [name]: value,
        });
    };

    return (
        <div className="col-md-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <div>
                    <div className="col-md-12">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label>Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <img
                            src=''
                            alt="profileImage"
                            style={{ height: "150px", width: "200px" }}
                            className="my-3"
                        />
                    </div>
                    <button
                        className={`btn btn-primary mt-3`}
                    >
                        Edit Banner
                    </button>
                </div>
            </div>
        </div >
    );
};

export default EditBanner;
