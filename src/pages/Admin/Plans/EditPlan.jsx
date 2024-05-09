import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getPlan, editPlan } from "../../../api/admin/plan";
import PlanForm from "../../../components/Admin/PlanForm";
import planSchema from "../../../utils/validations/adminValidations/planSchema";

const EditPlan = () => {
    const [planData, setPlanData] = useState({
        name: "",
        description: "",
        type: "",
        amount: undefined,
        numberOfJobPosts: undefined
    });
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getPlanDetails = async () => {
            try {
                const response = await getPlan(id);
                if (response && response.status === 200 && response.plan) {
                    setPlanData(response.plan);
                } else {
                    setErrors("Failed to fetch plan details.");
                }
            } catch (error) {
                setErrors("An error occurred while fetching plan details.");
                console.error("Error fetching plan details: ", error);
            }
        };

        getPlanDetails();
    }, [id]);

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

    const handleEditPlan = async () => {
        try {
            await planSchema.validate(planData, { abortEarly: false });
            setErrors({});

            const response = await editPlan(planData);
            if (response) {
                setServerResponse(response);
                if (response.status === 200) {
                    navigate("/admin/subscription-plans");
                    toast.success("Edited plan successfully");
                } else {
                    toast.error(response?.message || "An error occurred during editing plan");
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
                setServerResponse({ status: "failed", message: "An error occurred during editing plan" });
            }
        }
    };

    const PlanFormProps = {
        title: "Edit Plan",
        planData: planData,
        handleInputChange: handleInputChange,
        handleSubmit: handleEditPlan,
        serverResponse: serverResponse,
        errors: errors,
    };

    return (
        <PlanForm {...PlanFormProps} />
    );
};

export default EditPlan;
