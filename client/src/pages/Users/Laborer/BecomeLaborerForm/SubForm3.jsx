import FormErrorDisplay from "../../../../components/FormErrorDisplay";

function SubForm3({ formData, setFormData, errors }) {
    return (
        <>
            <h5 className="mb-2">Sub 3</h5>
            <div className="col-md-12">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                />
                {/* {errors.title && <span className="error-display">{errors.title}</span>} */}
            </div>
            <div className="col-md-12">
                <label>Description</label>
                <textarea
                    type="text"
                    className="form-control"
                    name="description"
                />
                {/* {errors.description && <span className="error-display">{errors.description}</span>} */}
            </div>
            <div className="form-group row">
                <div className="col-md-4">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                    />
                    {/* {errors.date && <span className="error-display">{errors.date}</span>} */}
                </div>
                <div className="col-md-4">
                    <label>Time</label>
                    <input
                        type="time"
                        className="form-control"
                        name="time"
                    />
                    {/* {errors.time && <span className="error-display">{errors.time}</span>} */}
                </div>
                <div className="col-md-4">
                    <label>Duration(hrs)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="duration"
                    />
                    {/* {errors.duration && <span className="error-display">{errors.duration}</span>} */}
                </div>
            </div>
        </>
    );
};

export default SubForm3;
