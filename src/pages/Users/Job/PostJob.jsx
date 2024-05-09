import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postNewJob, getRemainingPosts } from "../../../api/user/job";
import { jobSchema } from "../../../utils/validations/userValidations/jobSchema";
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
  const [remainingPosts, setRemainingPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getRemainingPostsCount = async () => {
      setLoading(true);
      try {
        const response = await getRemainingPosts(currentUser?._id);
        if (response && response.status === 200) {
          setRemainingPosts(response.remainingPosts);
        } else {
          toast.error("Failed to fetch remaining post's count");
        }
      } catch (error) {
        toast.error("An error occured while fetching remaining post's count");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRemainingPostsCount();
  }, []);

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
      if (typeof postData.location === "string") {
        postData.location = JSON.parse(postData.location);
      }
      await jobSchema.validate(postData, { abortEarly: false });
      const response = await postNewJob(postData);
      if (response) {
        setServerResponse(response);

        if (response.status === 200) {
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

  const JobPostFormProps = {
    heading: "Post New Job",
    postData: postData,
    handleInputChange: handleInputChange,
    errors: errors,
    newAddressSelected: newAddressSelected,
    handleFieldChange: handleFieldChange,
    handleRemoveField: handleRemoveField,
    handleAddField: handleAddField,
    buttonText: "Post Job",
    handleSubmit: handlePostJob,
    serverResponse: serverResponse,
  };

  return (
    <div className="col-10 my-3 mx-auto">
      {loading ? <>Loading...</> : (
        currentUser.currentSubscription !== null ? (
          remainingPosts > 0 ? (
            <JobPostForm {...JobPostFormProps} />
          ) : (
            <div>
              <p>
                You have reached the maximum allowed number of job posts for your current subscription.
              </p>
              <Link to="/manage-subscription">
                Manage Subscription!
              </Link>
            </div>
          )
        ) : (
          <div>
            <p>No active subscription found.</p>
            <Link to="/manage-subscription">
              Upgrade to Unlock Premium Features!
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default PostJob;
