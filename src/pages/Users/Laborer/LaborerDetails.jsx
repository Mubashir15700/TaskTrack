import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLaborer } from "../../../api/user/laborer";
import Address from "../../../components/Users/Address";
import JobPostForm from "../../../components/Users/JobPostForm";

const LaborerDetails = () => {
  const [laborer, setLaborer] = useState({});
  const [showFormIndex, setShowFormIndex] = useState(null);

  const toggleForm = (index) => {
    setShowFormIndex(prevIndex => prevIndex === index ? null : index);
  };

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
        materialsRequired: "",
        wagePerHour: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

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

  const { id } = useParams();

  useEffect(() => {
    const getLaborerDetails = async () => {
      try {
        const response = await getLaborer(id);
        if (response && response.status === 200) {
          setLaborer(response.laborer);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLaborerDetails();
  }, [id]);

  return (
    <div className="col-md-8 col-10 my-3 mx-auto">
      {
        laborer ? (
          <div className="card">
            <div className="card-header">
              {/* {laborer.user?.username} */}
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center">
                {laborer.user?.profile ? (
                  <img
                    src={`http://localhost:3000/uploads/profile/${laborer.user?.profile}`}
                    alt="emp-profile"
                    className="img-fluid"
                  />
                ) : (
                  <i className="bi bi-person-circle fs-1 mb-3"></i>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center me-5">
                <p>{laborer.user?.username}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center me-5">
              <Link
                to={`/chat/${laborer.user?._id}/${laborer.user?.username}`}
                className="btn btn-outline-primary"
              >
                <i className="bi bi-chat-dots"></i>
              </Link>
            </div>
            <div className="px-1">
              <Address
                label={"Location"}
                currentAddress={laborer.user?.location}
                usage={"display-laborer"}
              />
            </div>
            <hr className="my-3" />
            <div className="m-2">
              <p>Languages known: {laborer?.languages}</p>
              <p>Education: {laborer?.education}</p>
            </div>
            <hr className="my-3" />
            <div className="mt-3">
              {laborer.fields && laborer.fields.map((field, index) => (
                <div key={index}>
                  <div className="p-3 mb-3">
                    <p className="mb-3"><strong>Work Category: {field.name}</strong></p>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1">Workers Done Before: {field.worksDone}</p>
                        <p className="mb-1">Wage Per Hour: <strong>{field.wagePerHour}</strong></p>
                      </div>
                      {showFormIndex !== index && (
                        <div className="col-md-3">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => toggleForm(index)}
                          >
                            Request
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {showFormIndex === index && (
                    <div>
                      <JobPostForm
                        heading={"Send Request"}
                        postData={postData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        newAddressSelected={newAddressSelected}
                        handleFieldChange={handleFieldChange}
                        handleRemoveField={handleRemoveField}
                        handleAddField={handleAddField}
                        buttonText={"Send Request"}
                        handleSubmit={""}
                        serverResponse={serverResponse}
                        purpose={"Send Request"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            No laborer found
          </div>
        )
      }
    </div>
  );
};

export default LaborerDetails;
