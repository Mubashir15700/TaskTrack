import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postNewJob } from "../../../api/userApi";
import { jobSchema } from "../../../validations/userValidations/jobSchema";
import JobPostForm from "../../../components/Users/JobPostForm";

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
        wagePerHour: "",
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
          navigate("/jobs/listed-jobs");
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
    <JobPostForm
      heading={'Post New Job'}
      postData={postData}
      handleInputChange={handleInputChange}
      errors={errors}
      newAddressSelected={newAddressSelected}
      handleFieldChange={handleFieldChange}
      handleRemoveField={handleRemoveField}
      handleAddField={handleAddField}
      buttonText={"Post Job"}
      handleSubmit={handlePostJob}
      serverResponse={serverResponse}
    />
  );
};

export default PostJob;
