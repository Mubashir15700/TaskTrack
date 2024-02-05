import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getPlan, editPlan } from "../../../api/adminApi";
import PlanForm from "../../../components/Admin/PlanForm";
import planSchema from "../../../validations/adminValidations/planSchema";

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
                // dispatch(setLoading(true));
                const response = await getPlan(id);
                if (response && response.data.status === "success" && response.data.plan) {
                    setPlanData(response.data.plan);
                } else {
                    setErrors("Failed to fetch plan details.");
                }
            } catch (error) {
                setErrors("An error occurred while fetching plan details.");
                console.error("Error fetching plan details: ", error);
            } finally {
                // dispatch(setLoading(false));
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
                setServerResponse(response.data);
                if (response.data.status === "success") {
                    navigate("/admin/subscription-plans");
                    toast.success("Edited plan successfully");
                } else {
                    toast.error(response?.data?.message || "An error occurred during editing plan");
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

    return (
        <PlanForm
            title={"Edit Plan"}
            planData={planData}
            handleInputChange={handleInputChange}
            handleSubmit={handleEditPlan}
            serverResponse={serverResponse}
            errors={errors}
        />
    );
};

export default EditPlan;
