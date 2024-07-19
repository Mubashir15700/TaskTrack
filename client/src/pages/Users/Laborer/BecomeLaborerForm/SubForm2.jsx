import Select from "react-select";
import iso6391 from "iso-639-1";
import FormErrorDisplay from "../../../../components/FormErrorDisplay";

function SubForm2(
    { formData, setFormData, errors, handleFieldChange, handleRemoveField, handleAddField, setChanged }
) {
    // Get all language names
    const languageNames = iso6391.getAllNames();

    // Create an array of objects with value and label properties
    const SelectLanguageoptions = languageNames.map((language) => ({
        value: language,
        label: language,
    }));

    const LanguagesSelectProps = {
        defaultValue: SelectLanguageoptions.filter((option) =>
            formData.languages?.includes(option.value)
        ),
        options: SelectLanguageoptions,
        onChange: (selectedOptions) => {
            // Extract the values from selectedOptions
            const selectedValues = selectedOptions.map((option) => option.value);

            // Update the state with the selected values
            setFormData({ ...formData, languages: selectedValues });
            setChanged && setChanged(true);
        },
    };

    const SelectEduLeveloptions = [
        { value: "High School Diploma", label: "High School Diploma" },
        { value: "Associate Degree", label: "Associate Degree" },
        { value: "Bachelor\'s Degree", label: "Bachelor\'s Degree" },
        { value: "Master\'s Degree", label: "Master\'s Degree" },
    ];

    const EduLevelSelectProps = {
        defaultValue: SelectEduLeveloptions.filter((option) =>
            formData.education?.includes(option.value)),
        options: SelectEduLeveloptions,
        onChange: (selectedOptions) => {
            // Extract the values from selectedOptions
            const selectedValues = selectedOptions.map((option) => option.value);

            // Update the state with the selected values
            setFormData({ ...formData, education: selectedValues });
            setChanged && setChanged(true);
        },
    };

    const SelectDayoptions = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];

    const DaysSelectProps = {
        defaultValue: SelectDayoptions.filter((option) =>
            formData.avlDays?.includes(option.value)
        ),
        options: SelectDayoptions,
        onChange: (selectedOptions) => {
            // Extract the values from selectedOptions
            const selectedValues = selectedOptions.map((option) => option.value);

            // Update the state with the selected values
            setFormData({ ...formData, avlDays: selectedValues });
            setChanged && setChanged(true);
        },
    };

    const SelectTimeoptions = [
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Mornings", label: "Mornings" },
        { value: "Afternoons", label: "Afternoons" },
        { value: "Evenings", label: "Evenings" },
        { value: "On Call", label: "On Call" },
    ];

    const TimesSelectProps = {
        defaultValue: SelectTimeoptions.filter((option) =>
            formData.avlTimes?.includes(option.value)),
        options: SelectTimeoptions,
        onChange: (selectedOptions) => {
            // Extract the values from selectedOptions
            const selectedValues = selectedOptions.map((option) => option.value);

            // Update the state with the selected values
            setFormData({ ...formData, avlTimes: selectedValues });
            setChanged && setChanged(true);
        },
    };

    return (
        <>
            <h5 className="mb-2">Laborer Details</h5>
            <div className="col-md-12 mt-3">
                <label>Known Languages</label>
                <Select {...LanguagesSelectProps} isMulti />
                <FormErrorDisplay error={errors.languages} />
            </div>
            <div className="col-md-12 mt-3">
                <label>Level of Education</label>
                <Select {...EduLevelSelectProps} isMulti />
                <FormErrorDisplay error={errors.education} />
            </div>
            <div className="form-group row mt-3">
                <div className="col-md-6">
                    <label>Available Days</label>
                    <Select {...DaysSelectProps} isMulti />
                    <FormErrorDisplay error={errors.avlDays} />
                </div>
                <div className="col-md-6">
                    <label>Available Times</label>
                    <Select {...TimesSelectProps} isMulti />
                    <FormErrorDisplay error={errors.avlTimes} />
                </div>
            </div>
            <div className="form-group row mt-3">
                {formData.fields?.map((field, index) => (
                    <div key={index} className="field-container form-group row col-md-12 mb-2">
                        <div className="row col-md-8">
                            <div className="col-md-6">
                                <label>Fields of work</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Field ${index + 1} Name`}
                                    value={field.name}
                                    onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                                />
                                {errors?.["fields[0].name"] && (
                                    <FormErrorDisplay error={errors["fields[0].name"]} />
                                )}
                            </div>
                            <div className="col-md-6">
                                <label>Number of works done</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Number of works done before"
                                    value={field.worksDone}
                                    onChange={(e) => handleFieldChange(index, { worksDone: e.target.value })}
                                />
                                {errors?.["fields[0].worksDone"] && (
                                    <FormErrorDisplay error={errors["fields[0].worksDone"]} />
                                )}
                            </div>
                        </div>
                        <div className="row col-md-4">
                            <div className="col-md-10">
                                <label>Preferred wage per hour</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Preferred Hourly Wage"
                                    value={field.wagePerHour}
                                    onChange={(e) => handleFieldChange(index, { wagePerHour: e.target.value })}
                                />
                                {errors?.["fields[0].wagePerHour"] && (
                                    <FormErrorDisplay error={errors["fields[0].wagePerHour"]} />
                                )}
                            </div>
                            {formData.fields.length > 1 && (
                                <div className="col-md-1 mt-4">
                                    <button type="button" className="btn" onClick={() => handleRemoveField(index)}>
                                        <i className="bi bi-x-circle text-danger"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <FormErrorDisplay error={errors.fields} />
            </div>
            <button type="button" className="btn" onClick={handleAddField}>
                <i className="bi bi-plus-circle"></i>
            </button>
        </>
    );
};

export default SubForm2;
