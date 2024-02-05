const PlanForm = ({
    title, planData, handleInputChange, handleSubmit, serverResponse, errors
}) => {
    return (
        <div className="col-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <h5 className="mb-3">{title}</h5>
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
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        {errors.type && <span className="error-display">{errors.type}</span>}
                    </div>
                    <div className="col-md-6 col-12">
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
                <div className="col-md-12">
                    <label>Number of job posts</label>
                    <input
                        type="number"
                        className="form-control"
                        name="numberOfJobPosts"
                        value={planData.numberOfJobPosts}
                        onChange={handleInputChange}
                    />
                    {errors.numberOfJobPosts && <span className="error-display">{errors.numberOfJobPosts}</span>}
                </div>
            </div>
            <button
                className={`btn btn-primary mt-3`}
                onClick={handleSubmit}
            >
                {title}
            </button>
            {serverResponse && (
                <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {serverResponse.message}
                </div>
            )}
        </div>
    );
};

export default PlanForm;
