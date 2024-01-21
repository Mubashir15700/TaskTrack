import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addPlan } from "../../../api/adminApi";
import planSchema from "../../../validations/adminValidations/planSchema";

const AddPlan = () => {
    const [planData, setPlanData] = useState({
        name: "",
        description: "",
        type: "",
        number: undefined,
        amount: undefined
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
        <div className="col-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <h5 className="mb-3">Add Subscription Plan</h5>
                <div className="col-md-12">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={planData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span className="error-display">{errors.name}</span>}
                </div>
                <div className="col-md-12">
                    <label>Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="description"
                        value={planData.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <span className="error-display">{errors.description}</span>}
                </div>
                <div className="col-12 d-md-flex justify-content-between">
                    <div className="col-md-6 col-12">
                        <label>Type</label>
                        <select
                            className="form-control"
                            name="type"
                            value={planData.type}
                            onChange={handleInputChange}
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        {errors.type && <span className="error-display">{errors.type}</span>}
                    </div>
                    <div className="col-md-6 col-12">
                        <label>Number of Weeks</label>
                        <select
                            className="form-control"
                            name="number"
                            value={planData.number}
                            onChange={handleInputChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        {errors.number && <span className="error-display">{errors.number}</span>}
                    </div>
                </div>
                <div className="col-md-12">
                    <label>Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={planData.amount}
                        onChange={handleInputChange}
                    />
                    {errors.amount && <span className="error-display">{errors.amount}</span>}
                </div>
            </div>
            <button
                className={`btn btn-primary mt-3`}
                onClick={handleAddPlan}
            >
                Add Plan
            </button>
            {serverResponse && (
                <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {serverResponse.message}
                </div>
            )}
        </div>
    );
};

export default AddPlan;
