const Fields = ({ field, index, errors, handleFieldChange, handleRemoveField, getJobApplicants }) => {
    return (
        <div className="field-container form-group row col-md-12 mb-2">
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Field ${index + 1} Name`}
                    value={field.name || ""}
                    onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].name`) && (
                    <p className="error-display">Field name is required</p>
                )}
            </div>
            <div className="col-md-2">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Number of Workers"
                    value={field.workers || ""}
                    onChange={(e) => handleFieldChange(index, { workers: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].workers`) && (
                    <p className="error-display">Number of workers must be a positive number</p>
                )}
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Materials Required"
                    value={field.materialsRequired || ""}
                    onChange={(e) => handleFieldChange(index, { materialsRequired: e.target.value })}
                />
            </div>
            <div className="col-md-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Hourly Wage"
                    value={field.wagePerHour || ""}
                    onChange={(e) => handleFieldChange(index, { wagePerHour: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].wagePerHour`) && (
                    <p className="error-display">Wage per hour must be a positive number</p>
                )}
            </div>
            <div className="col-md-6">
                <button type="button" className="btn" onClick={() => handleRemoveField(index)}>
                    <i className="bi bi-x-circle text-danger"></i>
                </button>
                {field.applicants?.length && (
                    <Link onClick={() => getJobApplicants(field.name)}>
                        {`View (${field.applicants.length})Applicants`}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Fields;
