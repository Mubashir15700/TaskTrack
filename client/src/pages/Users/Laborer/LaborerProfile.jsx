import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubForm2 from "../Laborer/BecomeLaborerForm/SubForm2";
import { workSchema } from "../../../utils/validations/userValidations/becomeLaborerSchema";
import { updateLaborerProfile } from "../../../api/user/profile";

const LaborerProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const laborerProfileData = location.state?.laborerProfileData;

    const [laborerData, setLaborerData] = useState({
        userId: laborerProfileData?.userId,
        languages: laborerProfileData?.languages,
        education: laborerProfileData?.education,
        avlDays: laborerProfileData?.avlDays,
        avlTimes: laborerProfileData?.avlTimes,
        fields: laborerProfileData?.fields,
    });

    const [changed, setChanged] = useState(false);
    const [errors, setErrors] = useState({});

    const handleFieldChange = (index, fieldData) => {
        setChanged(true);
        const updatedFields = [...laborerData.fields];
        updatedFields[index] = { ...updatedFields[index], ...fieldData };

        setLaborerData({
            ...laborerData,
            fields: updatedFields,
        });
    };

    const handleAddField = () => {
        setLaborerData({
            ...laborerData,
            fields: [...laborerData.fields, { name: "", worksDone: "", wagePerHour: "" }],
        });
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...laborerData.fields];
        updatedFields.splice(index, 1);

        setLaborerData({
            ...laborerData,
            fields: updatedFields,
        });
    };

    const handleUpdate = async () => {
        try {
            await workSchema.validate(laborerData, { abortEarly: false });

            const response = await updateLaborerProfile(laborerData);
            if (response && response.status === 200) {
                toast.success("Updated laborer profile successfully");
                navigate("/account");
            } else {
                toast.error("An error occured while updating profile");
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                toast.error("An error occured");
                console.log("Update laborer profile error: ", error);
            }
        }
    };

    const SubForm2Props = {
        formData: laborerData,
        setFormData: setLaborerData,
        handleFieldChange: handleFieldChange,
        handleRemoveField: handleRemoveField,
        handleAddField: handleAddField,
        errors: errors,
        setChanged: setChanged,
    };

    return (
        <div className="col-10 mx-auto my-3">
            <div className="my-3  p-3 p-lg-5 border mt-5">
                <SubForm2 {...SubForm2Props} />
                {changed && (
                    <button className="d-block btn btn-primary" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    );
};

export default LaborerProfile;
