import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Address from "./Address";
import { getApplicants } from "../../api/userApi";

const JobPostForm = ({
    heading,
    postData: initialData,
    handleInputChange,
    errors,
    newAddressSelected,
    handleFieldChange,
    handleRemoveField,
    handleAddField,
    buttonText,
    isChanged,
    handleSubmit,
    handleDeleteJob,
    serverResponse
}) => {
    const navigate = useNavigate();

    const [postData, setPostData] = useState(initialData || {});

    useEffect(() => {
        setPostData(initialData);
    }, [initialData]);

    const getJobApplicants = async (fieldName) => {
        try {
            const response = await getApplicants({ jobId: postData._id, fieldName });
            if (response && response.data.status === "success") {
                navigate("/jobs/view-applicants", { 
                    state: { 
                        applicantsData: response.data.applicants, 
                        job: postData.title, 
                        jobId: postData._id,
                        status: postData.status, 
                        fieldName 
                    } 
                });
            } else {
                toast.error("Failed to fetch applicants");
            }
        } catch (error) {
            toast.error("An error occured while fetching applicants");
            console.log("Get applicants error: ", error);
        }
    };

    return (
        <div className="col-10 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <h3 className="mb-2">{heading}</h3>
                <div className="col-md-12">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={postData?.title || ""}
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
                        value={postData?.description || ""}
                        onChange={handleInputChange}
                    />
                    {errors.description && <span className="error-display">{errors.description}</span>}
                </div>
                <div className="form-group row">
                    <div className="col-md-4">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            value={postData?.date ? new Date(postData.date).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                        {errors.date && <span className="error-display">{errors.date}</span>}
                    </div>
                    <div className="col-md-4">
                        <label>Time</label>
                        <input
                            type="time"
                            className="form-control"
                            name="time"
                            value={postData?.time || ""}
                            onChange={handleInputChange}
                        />
                        {errors.time && <span className="error-display">{errors.time}</span>}
                    </div>
                    <div className="col-md-4">
                        <label>Duration(hrs)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="duration"
                            value={postData?.duration || ""}
                            onChange={handleInputChange}
                        />
                        {errors.duration && <span className="error-display">{errors.duration}</span>}
                    </div>
                </div>
                <Address
                    label={"Location"}
                    currentAddress={postData.location}
                    onAddressChange={newAddressSelected}
                    usage={"postjob"}
                />
                {errors.location && <span className="error-display">{errors.location}</span>}
                {/* Fields Section */}
                <div className="col-md-12">
                    <label>Required Fields</label>
                    {postData.fields?.map((field, index) => (
                        <div key={index} className="field-container form-group row col-md-12 mb-2">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Field ${index + 1} Name`}
                                    value={field.name || ""}
                                    onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                                />
                                {errors.hasOwnProperty(`fields[${index}].name`) && (
                                    <p className="error-display">Field name is required</p>
                                )}
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Number of Workers"
                                    value={field.workers || ""}
                                    onChange={(e) => handleFieldChange(index, { workers: e.target.value })}
                                />
                                {errors.hasOwnProperty(`fields[${index}].workers`) && (
                                    <p className="error-display">Number of workers must be a positive number</p>
                                )}
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Materials Required"
                                    value={field.materialsRequired || ""}
                                    onChange={(e) => handleFieldChange(index, { materialsRequired: e.target.value })}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Hourly Wage"
                                    value={field.wagePerHour || ""}
                                    onChange={(e) => handleFieldChange(index, { wagePerHour: e.target.value })}
                                />
                                {errors.hasOwnProperty(`fields[${index}].wagePerHour`) && (
                                    <p className="error-display">Wage per hour must be a positive number</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn" onClick={() => handleRemoveField(index)}>
                                    <i className="bi bi-x-circle text-danger"></i>
                                </button>
                                {field.applicants?.length && (
                                    <Link onClick={() => getJobApplicants(field.name)}>
                                        {`View (${field.applicants.length})Applicants`}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn" onClick={handleAddField}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                </div>
                {/* End of Fields Section */}
                {heading !== "Post New Job" && (
                    <div className="form-group row">
                        <div className="col-md-4">
                            <label>Status</label>
                            <select
                                className="form-control"
                                name="status"
                                value={postData?.status}
                                onChange={handleInputChange}
                            >
                                <option value="open">Open</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="col-md-4 mt-4">
                            <button className="btn btn-danger" onClick={handleDeleteJob}>Delete this job</button>
                        </div>
                    </div>
                )}
                {(heading === "Post New Job" || isChanged) && (
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleSubmit}
                    >
                        {buttonText}
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

export default JobPostForm;
