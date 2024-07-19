import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import Address from "./Address";
import Fields from "./Fields";
import FormErrorDisplay from "../FormErrorDisplay";
import { getApplicants } from "../../api/user/job";

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
    serverResponse,
    purpose
}) => {

    const navigate = useNavigate();

    const [postData, setPostData] = useState(initialData || {});

    useEffect(() => {
        setPostData(initialData);
    }, [initialData]);

    const getJobApplicants = async (fieldName) => {
        try {
            const response = await getApplicants({ jobId: postData._id, fieldName });
            if (response && response.status === 200) {
                navigate("/jobs/view-applicants", {
                    state: {
                        applicantsData: response.applicants,
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
                <FormErrorDisplay error={errors.title} />
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
                <FormErrorDisplay error={errors.description} />
            </div>
            <div className="form-group row">
                <div className="col-md-4">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={postData?.date ? new Date(postData.date).toISOString().split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                    <FormErrorDisplay error={errors.date} />
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
                    <FormErrorDisplay error={errors.time} />
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
                    <FormErrorDisplay error={errors.duration} />
                </div>
            </div>
            <Address
                label={"Location"}
                currentAddress={postData.location}
                onAddressChange={newAddressSelected}
                usage={"postjob"}
            />
            <FormErrorDisplay error={errors.location} />
            {/* Fields Section */}
            <div className="col-md-12">
                <label>Required Fields</label>
                {postData.fields?.map((field, index) => (
                    <Fields
                        key={index}
                        field={field}
                        index={index}
                        errors={errors}
                        handleFieldChange={handleFieldChange}
                        handleRemoveField={handleRemoveField}
                        getJobApplicants={getJobApplicants}
                    />
                ))}
                <Tooltip
                    id="add-field-tooltip"
                    anchorSelect=".add-field-button"
                    place="left"
                    effect="solid"
                    content={"Add new field"}
                >
                    Add new field
                </Tooltip>
                <button type="button" className="btn add-field-button" onClick={handleAddField}>
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>
            {/* End of Fields Section */}
            {(heading !== "Post New Job" && purpose !== "Send Request") && (
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
                <div className={`alert ${serverResponse.status !== 200 ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {serverResponse.message}
                </div>
            )}
        </div>
    );
};

export default JobPostForm;
