import Select from "react-select";

const SelectDayoptions = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
];

const SelectTimeoptions = [
    { value: "full time", label: "Full Time" },
    { value: "part time", label: "Part Time" },
    { value: "mornings", label: "Mornings" },
    { value: "afternoons", label: "Afternoons" },
    { value: "evenings", label: "Evenings" },
    { value: "on call", label: "On Call" },
];

function SubForm2(
    { formData, setFormData, errors, handleFieldChange, handleRemoveField, handleAddField, purpose, setChanged }
) {
    return (
        <>
            <h5 className="mb-2">Laborer Details</h5>
            <div className="col-md-12 mt-3">
                <label>Known Languages</label>
                <input
                    type="text"
                    className="form-control"
                    name="languages"
                    value={formData.languages}
                    onChange={(e) => {
                        setChanged && setChanged(true);
                        setFormData({ ...formData, languages: e.target.value });
                    }}
                />
                {errors.languages && <span className="error-display">{errors.languages}</span>}
            </div>
            <div className="col-md-12">
                <label>Education</label>
                <input
                    type="text"
                    className="form-control"
                    name="education"
                    value={formData.education}
                    onChange={(e) => {
                        setChanged && setChanged(true);
                        setFormData({ ...formData, education: e.target.value });
                    }}
                />
                {errors.education && <span className="error-display">{errors.education}</span>}
            </div>
            <div className="form-group row">
                <div className="col-md-6">
                    <label>Available Days</label>
                    <Select
                        defaultValue={SelectDayoptions.filter((option) =>
                            formData.avlDays?.includes(option.value)
                        )}
                        options={SelectDayoptions}
                        onChange={(selectedOptions) => {
                            // Extract the values from selectedOptions
                            const selectedValues = selectedOptions.map((option) => option.value);

                            // Update the state with the selected values
                            setFormData({ ...formData, avlDays: selectedValues });
                            setChanged && setChanged(true);
                        }}
                        isMulti
                    />
                    {errors.avlDays && <span className="error-display">{errors.avlDays}</span>}
                </div>
                <div className="col-md-6">
                    <label>Available Times</label>
                    <Select
                        defaultValue={SelectTimeoptions.filter((option) =>
                            formData.avlTimes?.includes(option.value))}
                        options={SelectTimeoptions}
                        onChange={(selectedOptions) => {
                            // Extract the values from selectedOptions
                            const selectedValues = selectedOptions.map((option) => option.value);

                            // Update the state with the selected values
                            setFormData({ ...formData, avlTimes: selectedValues });
                            setChanged && setChanged(true);
                        }}
                        isMulti
                    />
                    {errors.avlTimes && <span className="error-display">{errors.avlTimes}</span>}
                </div>
            </div>
            <div className="form-group row mt-5">
                <label>Fields of work</label>
                {formData.fields?.map((field, index) => (
                    <div key={index} className="field-container form-group row col-md-12 mb-2">
                        <div className="row col-md-6">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Field ${index + 1} Name`}
                                    value={field.name}
                                    onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                                />
                                {errors?.["fields[0].name"] && (
                                    <p className="error-display">{errors["fields[0].name"]}</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Number of works done before"
                                    value={field.worksDone}
                                    onChange={(e) => handleFieldChange(index, { worksDone: e.target.value })}
                                />
                                {errors?.["fields[0].worksDone"] && (
                                    <p className="error-display">{errors["fields[0].worksDone"]}</p>
                                )}
                            </div>
                        </div>
                        <div className="row col-md-6">
                            <div className="col-md-11">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Preferred Hourly Wage"
                                    value={field.wagePerHour}
                                    onChange={(e) => handleFieldChange(index, { wagePerHour: e.target.value })}
                                />
                                {errors?.["fields[0].wagePerHour"] && (
                                    <p className="error-display">{errors["fields[0].wagePerHour"]}</p>
                                )}
                            </div>
                            <div className="col-md-1">
                                <button type="button" className="btn" onClick={() => handleRemoveField(index)}>
                                    <i className="bi bi-x-circle text-danger"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {errors.fields && <p className="error-display">{errors.fields}</p>}
            </div>
            <button type="button" className="btn" onClick={handleAddField}>
                <i className="bi bi-plus-circle"></i>
            </button>
        </>
    );
};

export default SubForm2;
