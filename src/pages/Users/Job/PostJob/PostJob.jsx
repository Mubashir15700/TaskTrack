import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postNewJob } from "../../../../services/api";
import { jobSchema } from "../../../../validations/userValidations/jobSchema";
import Address from "../../../../components/Users/Address";
import "./PostJob.css";

const PostJob = () => {
  const currentUser = useSelector((state) => state.user.userData);

  const [postData, setPostData] = useState({
    userId: currentUser._id,
    title: "",
    description: "",
    date: undefined,
    time: undefined,
    duration: undefined,
    location: currentUser.location,
    fields: [
      {
        name: "",
        workers: 1,
        materialsRequired: "",
        wagePerHour: undefined,
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleFieldChange = (index, fieldData) => {
    const updatedFields = [...postData.fields];
    updatedFields[index] = { ...updatedFields[index], ...fieldData };

    setPostData({
      ...postData,
      fields: updatedFields,
    });
  };

  const handleAddField = () => {
    setPostData({
      ...postData,
      fields: [...postData.fields, { name: "", workers: 1 }],
    });
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...postData.fields];
    updatedFields.splice(index, 1);

    setPostData({
      ...postData,
      fields: updatedFields,
    });
  };

  const newAddressSelected = (address) => {
    setPostData({
      ...postData,
      location: address,
    });
  };

  const handlePostJob = async () => {
    try {
      await jobSchema.validate(postData, { abortEarly: false });
      const response = await postNewJob(postData);
      if (response) {
        setServerResponse(response.data);

        if (response.data.status === "success") {
          navigate("/jobs");
          toast.success("Posted new job successfully");
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.log(error);
        setServerResponse({ status: "failed", message: "An error occurred during posting job" });
      }
    }
  };

  return (
    <div className="col-md-8 my-3 mx-auto">
      <div className="p-3 p-lg-5 border">
        <div className="col-md-12">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
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
              onChange={handleInputChange}
            />
            {errors.duration && <span className="error-display">{errors.duration}</span>}
          </div>
        </div>
        <Address
          label={"Location"}
          currentAddress={currentUser.location}
          onAddressChange={newAddressSelected}
          usage={"postjob"}
        />
        {errors.location && <span className="error-display">{errors.location}</span>}
        {/* Fields Section */}
        <div className="col-md-12">
          <label>Required Fields</label>
          {postData.fields.map((field, index) => (
            <div key={index} className="field-container form-group row col-md-12 mb-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Field ${index + 1} Name`}
                  value={field.name}
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
                  value={field.workers}
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
                  value={field.materialsRequired}
                  onChange={(e) => handleFieldChange(index, { materialsRequired: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Hourly Wage"
                  value={field.wagePerHour}
                  onChange={(e) => handleFieldChange(index, { wagePerHour: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].wagePerHour`) && (
                  <p className="error-display">Wage per hour must be a positive number</p>
                )}
              </div>
              <div className="col-md-2">
                <button type="button" className="btn" onClick={() => handleRemoveField(index)}>
                  <i className="bi bi-x-circle text-danger"></i>
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="btn" onClick={handleAddField}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        {/* End of Fields Section */}
        <button
          className="btn btn-primary mt-3"
          onClick={handlePostJob}
        >
          Post Job
        </button>
        {serverResponse && (
          <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
            {serverResponse.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJob;
