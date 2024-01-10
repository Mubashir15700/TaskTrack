import { useState } from "react";
// import { planSchema } from "../../../validations/adminValidations/planSchema";

const EditPlan = () => {
    const [planData, setPlanData] = useState({
        title: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlanData({
            ...planData,
            [name]: value,
        });
    };

    // console.log(planData);

    return (
        <div className="col-md-8 my-3 mx-auto">
            <div className="p-3 p-lg-5 border">
                <div>
                    <div className="col-md-12">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label>Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className={`btn btn-primary mt-3`}
                    >
                        Add Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPlan;
