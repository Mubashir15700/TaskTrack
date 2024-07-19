import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData as updateUserData } from "../../../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { sendRequest, updateRequest } from "../../../../api/user/request";
import { profileSchema, workSchema } from "../../../../utils/validations/userValidations/becomeLaborerSchema";
import SubForm1 from "./SubForm1";
import SubForm2 from "./SubForm2";
import socket from "../../../../socket/socket";

function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const prevRequest = location.state;

    const currentUser = useSelector((state) => state.user.userData);

    const [userData, setUserData] = useState(currentUser || {});

    const defaultField = {
        name: "",
        worksDone: "",
        wagePerHour: "",
    };

    const [workData, setWorkData] = useState({
        userId: currentUser?._id,
        languages: prevRequest?.languages ?? "",
        education: prevRequest?.education ?? "",
        avlDays: prevRequest?.avlDays,
        avlTimes: prevRequest?.avlTimes,
        fields: prevRequest?.fields ?? [defaultField],
    });

    const [page, setPage] = useState(0);
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const FormTitles = ["Sub1", "Sub2"];

    // sub form 2
    const handleFieldChange = (index, fieldData) => {
        const updatedFields = [...workData.fields];
        updatedFields[index] = { ...updatedFields[index], ...fieldData };

        setWorkData({
            ...workData,
            fields: updatedFields,
        });
    };

    const handleAddField = () => {
        setWorkData({
            ...workData,
            fields: [...workData.fields, { name: "", worksDone: "", wagePerHour: "" }],
        });
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...workData.fields];
        updatedFields.splice(index, 1);

        setWorkData({
            ...workData,
            fields: updatedFields,
        });
    };

    const PageDisplay = () => {
        if (page === 0) {
            return <SubForm1
                formData={userData}
                setFormData={setUserData}
                errors={errors}
            />;
        } else if (page === 1) {
            return <SubForm2
                formData={workData}
                setFormData={setWorkData}
                handleFieldChange={handleFieldChange}
                handleRemoveField={handleRemoveField}
                handleAddField={handleAddField}
                errors={errors}
            />;
        }
    };

    const isLastPage = page === FormTitles.length - 1;
    const isUpdate = isLastPage && prevRequest;
    const buttonLabel = isLastPage ?
        isUpdate ?
            "Update" :
            "Submit"
        :
        "Next";

    const handleClick = async () => {
        try {
            // Validate the current form based on the current page
            let formErrors = {};
            if (page === 0) {
                await profileSchema.validate(userData, { abortEarly: false });
            } else if (page === 1) {
                await workSchema.validate(workData, { abortEarly: false });
            } else {
                formErrors = validateSubForm3(formData);
            }

            // Update the errors state
            setErrors(formErrors);

            // If there are errors, prevent proceeding to the next form or submitting
            if (Object.keys(formErrors).length > 0) {
                return;
            }

            // If it's the last page, submit the form
            if (page === FormTitles.length - 1) {
                let userDataToUpdate = {
                    id: currentUser?._id,
                };

                if (currentUser.username !== userData.username) {
                    userDataToUpdate.username = userData.username
                }
                if (currentUser.email !== userData.email) {
                    userDataToUpdate.email = userData.email
                }
                if (currentUser.phone !== userData.phone) {
                    userDataToUpdate.phone = userData.phone
                }
                if (currentUser.location !== userData.location) {
                    userDataToUpdate.location = userData.location
                }
                let formData = {
                    userData: (Object.keys(userDataToUpdate).length > 1 ? { ...userDataToUpdate } : {}),
                    ...workData
                };

                let response;
                if (prevRequest && Object.values(prevRequest)?.length) {
                    response = await updateRequest({ formData });
                } else {
                    response = await sendRequest({ formData });
                }

                if (response) {
                    if (response.status === 200) {
                        if (response?.updatedProfile) {
                            const currentUser = response.updatedProfile;
                            dispatch(updateUserData(currentUser));
                        }
                        if (response?.updatedRequest) {
                            setWorkData(response.updatedRequest);
                        }
                        toast.success("Your request has been sent");
                        navigate("/jobs/works-history");

                        socket.emit("request_submit", formData.userId);
                    } else {
                        toast.error(`Error: ${response.data.message}`);
                    }
                } else {
                    toast.error("Unexpected response structure");
                }
            } else {
                // If no errors, proceed to the next form
                setPage((currPage) => currPage + 1);
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                // Update the errors state
                const formErrors = error.inner.reduce((acc, err) => {
                    acc[err.path] = err.message;
                    return acc;
                }, {});
                setErrors(formErrors);
            } else {
                console.log(error);
                setServerResponse({
                    status: "failed",
                    message: "An error occurred"
                });
            }
        }
    };

    return (
        <div className="col-10 my-3 mx-auto">
            <div className="p-3 p-lg-5 border mt-5">
                <div className="header">
                    <h3 className="mb-4">Become A Laborer</h3>
                </div>
                <div className="progress mb-3">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                            width: `${((page + 1) / FormTitles.length) * 100}%`,
                            backgroundColor: "#4B49AC"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
                <div>
                    <div>{PageDisplay()}</div>
                    <div className="mt-3">
                        <button
                            disabled={page === 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                            className="btn btn-secondary me-2"
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleClick}
                            className="btn btn-primary"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                    {serverResponse && (
                        <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                            {serverResponse.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
