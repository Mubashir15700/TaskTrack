import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import FormErrorDisplay from "../FormErrorDisplay";

const Fields = ({ field, index, errors, handleFieldChange, handleRemoveField, getJobApplicants }) => {
    return (
        <div className="form-group row col-md-12 mb-2">
            <div className="col-md-4 mb-1">
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Field ${index + 1} Name`}
                    value={field.name || ""}
                    onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].name`) && (
                    <FormErrorDisplay error={"Field name is required"} />
                )}
            </div>
            <div className="col-md-2 mb-1">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Number of Workers"
                    value={field.workers || ""}
                    onChange={(e) => handleFieldChange(index, { workers: e.target.value })}
                />
                {errors.hasOwnProperty(`fields[${index}].workers`) && (
                    <FormErrorDisplay error={"Number of workers must be a positive number"} />
                )}
            </div>
            <div className="col-md-3 mb-1">
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
                    <FormErrorDisplay error={"Wage per hour must be a positive number"} />
                )}
            </div>
            <div className="col-md-6">
                <Tooltip
                    id="remove-field-tooltip"
                    anchorSelect=".remove-field-button"
                    place="left"
                    effect="solid"
                    content={"Remove this field"}
                >
                    Remove this field
                </Tooltip>
                {index >= 1 && (
                    <button type="button" className="btn remove-field-button" onClick={() => handleRemoveField(index)}>
                        <i className="bi bi-x-circle text-danger"></i>
                    </button>
                )}
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
