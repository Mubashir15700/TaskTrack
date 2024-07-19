import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getListedJob, updateListedJob, deleteListedJob } from "../../../api/user/job";
import { jobSchema } from "../../../utils/validations/userValidations/jobSchema";
import JobPostForm from "../../../components/Users/JobPostForm";
import SweetAlert from "../../../components/SweetAlert";

const EditListedJob = () => {
    const { id } = useParams();

    const [postData, setPostData] = useState({});
    const [changed, setChanged] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getListedJobToEdit = async () => {
            try {
                // dispatch(setLoading(true));
                const response = await getListedJob(id);
                if (response && response.status === 200 && response.job) {
                    setPostData(response.job);
                } else {
                    toast.error("Failed to fetch job data.");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while fetching job data.");
            } finally {
                // dispatch(setLoading(false));
            }
        };

        getListedJobToEdit();
    }, []);

    const handleInputChange = (e) => {
        setChanged(true);
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleFieldChange = (index, fieldData) => {
        setChanged(true);
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
        setChanged(true);
    };

    const handleEditJob = async () => {
        try {
            await jobSchema.validate(postData, { abortEarly: false });
            const response = await updateListedJob(postData);
            if (response) {
                setServerResponse(response);

                if (response.status === 200) {
                    navigate("/jobs/listed-jobs");
                    toast.success("Edited job successfully");
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
                setServerResponse({ status: "failed", message: "An error occurred during editing job" });
            }
        }
    };

    const confirmDeleteJob = async () => {
        const result = await SweetAlert.confirmAction(
            "Delete Job",
            "Are you sure you want to delete this job?",
            "Delete",
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleDeleteJob();
        }
    };

    const handleDeleteJob = async () => {
        try {
            const response = await deleteListedJob(id);
            if (response) {
                setServerResponse(response);

                if (response.status === 200) {
                    navigate("/jobs/listed-jobs");
                    toast.success("Deleted job successfully");
                }
            }
        } catch (error) {
            console.log(error);
            setServerResponse({ status: "failed", message: "An error occurred during deleteing job" });
        }
    };
    
    const JobPostFormProps = {
        heading: `Edit ${postData.title}`,
        postData: postData,
        handleInputChange: handleInputChange,
        errors: errors,
        newAddressSelected: newAddressSelected,
        handleFieldChange: handleFieldChange,
        handleRemoveField: handleRemoveField,
        handleAddField: handleAddField,
        buttonText: "Edit Job",
        isChanged: changed,
        handleSubmit: handleEditJob,
        handleDeleteJob: confirmDeleteJob,
        serverResponse: serverResponse,
    };

    return (
        <div className="col-10 my-3 mx-auto">
            <JobPostForm {...JobPostFormProps} />
        </div>
    );
};

export default EditListedJob;
