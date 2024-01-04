import { useState } from "react";
import { useSelector } from "react-redux";
import Address from "../../../components/Users/Address";
import './PostJob.css';

const PostJob = () => {
  const currentUserLocation = useSelector((state) => state.user.userData.location);

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    wagePerHour: '',
    materialsRequired: '',
    fields: [
      { name: '', workers: 1 },
    ],
  });

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
      fields: [...postData.fields, { name: '', workers: 1 }],
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

  const handleSubmit = () => {
    // Add logic to submit the form data
    console.log(postData);
    // Reset the form or redirect after submission
    // setPostData({ ...initialState });
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
        <div className="form-group row">
          <div className="col-md-4">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label>Duration(hrs)</label>
            <input
              type="number"
              className="form-control"
              name="duration"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Address
          label={'Location'}
          currentAddress={currentUserLocation}
          onAddressChange={''}
        />
        {/* Fields Section */}
        <div className="col-md-12">
          <label>Required Fields</label>
          {postData.fields.map((field, index) => (
            <div key={index} className="field-container form-group row col-md-12">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Field ${index + 1} Name`}
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of Workers"
                  value={field.workers}
                  onChange={(e) => handleFieldChange(index, { workers: e.target.value })}
                />
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
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default PostJob;
