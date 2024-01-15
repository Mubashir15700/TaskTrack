import { useState } from "react";
import { useSelector } from "react-redux";
import { sendRequest } from "../../../../services/userApi";
import { profileSchema, workSchema } from "../../../../validations/userValidations/becomeLaborerSchema";
import SubForm1 from "./SubForm1";
import SubForm2 from "./SubForm2";
// import SubForm3 from "./SubForm3";

function Form() {
    const currentUser = useSelector((state) => state.user.userData);

    const [userData, setUserData] = useState({
        username: currentUser?.username,
        phone: currentUser?.phone,
        email: currentUser?.email,
        location: currentUser?.location
    });

    const [workData, setWorkData] = useState({
        userId: currentUser?._id,
        languages: "",
        education: "",
        avlDays: null,
        avlTimes: null,
        fields: [
            {
                name: "",
                worksDone: 0,
                wagePerHour: undefined,
            },
        ],
    });

    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     firstName: "",
    //     lastName: "",
    //     username: "",
    //     nationality: "",
    //     other: "",
    // });

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
            fields: [...workData.fields, { name: "", worksDone: 0, wagePerHour: undefined }],
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
        } else {
            // return <SubForm3
            //     formData={formData}
            //     setFormData={setFormData}
            //     errors={errors}
            // />;
        }
    };

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
                const response = await sendRequest({ formData });
                console.log(response);
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
        <div className="col-10 my-3 mx-auto p-3 p-lg-5 border mt-5">
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
                        {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
                {serverResponse && (
                    <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                        {serverResponse.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;
