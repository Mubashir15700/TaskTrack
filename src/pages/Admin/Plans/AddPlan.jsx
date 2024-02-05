import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addPlan } from "../../../api/adminApi";
import PlanForm from "../../../components/Admin/PlanForm";
import planSchema from "../../../validations/adminValidations/planSchema";

const AddPlan = () => {
    const [planData, setPlanData] = useState({
        name: "",
        description: "",
        type: "",
        amount: undefined,
        numberOfJobPosts: undefined
    });
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setServerResponse("");
        const { name, value } = e.target;

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
        setPlanData({
            ...planData,
            [name]: value,
        });
    };

    const handleAddPlan = async () => {
        try {
            await planSchema.validate(planData, { abortEarly: false });
            setErrors({});

            const response = await addPlan(planData);
            if (response) {
                setServerResponse(response.data);
                if (response.data.status === "success") {
                    navigate("/admin/subscription-plans");
                    toast.success("Added new plan successfully");
                } else {
                    toast.error(response?.data?.message || "An error occurred during adding plan");
                }
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                setServerResponse({ status: "failed", message: "An error occurred during adding plan" });
            }
        }
    };

    return (
        <PlanForm
            title={"Add Plan"}
            planData={planData}
            handleInputChange={handleInputChange}
            handleSubmit={handleAddPlan}
            serverResponse={serverResponse}
            errors={errors}
        />
    );
};

export default AddPlan;
