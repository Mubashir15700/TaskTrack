import FormErrorDisplay from "../FormErrorDisplay";

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
                    <FormErrorDisplay error={errors.name} />
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
                    <FormErrorDisplay error={errors.description} />
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
                        <FormErrorDisplay error={errors.type} />
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
                        <FormErrorDisplay error={errors.amount} />
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
                    <FormErrorDisplay error={errors.numberOfJobPosts} />
                </div>
                <button
                    className={`btn btn-primary mt-3`}
                    onClick={handleSubmit}
                >
                    {title}
                </button>
            </div>
            {serverResponse && (
                <div className={`alert ${serverResponse.status !== 200 ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {serverResponse.message}
                </div>
            )}
        </div>
    );
};

export default PlanForm;
