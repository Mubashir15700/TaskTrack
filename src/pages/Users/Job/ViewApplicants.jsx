import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { applicantAction } from "../../../api/userApi";
import socket from "../../../socket/socket";

const ViewApplicants = () => {
    const location = useLocation();
    const [applicantsData, setApplicantsData] = useState(location.state?.applicantsData || []);
    const job = location.state?.job;
    const jobId = location.state?.jobId;
    const jobStatus = location.state?.status;
    const fieldName = location.state?.fieldName;

    const currentUserId = useSelector((state) => state.user.userData?._id);

    const takeApplicantAction = async (laborerId, action) => {
        try {
            const actionTook = action === "accept" ? "accepted" : "rejected";
            const response = await applicantAction({ jobId, fieldName, laborerId, actionTook });
            if (response && response.data.status === "success") {
                toast.success("Success");
                // Update the UI by modifying the state
                setApplicantsData((prevApplicants) => {
                    return prevApplicants.map((applicant) => {
                        if (applicant?.userId?._id === laborerId) {
                            // Update the status for the specific applicant
                            return {
                                ...applicant,
                                status: actionTook,
                            };
                        }
                        return applicant;
                    });
                });

                socket.emit("application_action", { laborerId, jobId, actionTook });
            } else {
                toast.error(`Failed to ${action} applicant`);
            }
        } catch (error) {
            toast.error("An error occured");
            console.log("Take applicant action error: ", error);
        }
    };

    return (
        <div className="col-10 mx-auto mt-3">
            <h3 className="mb-4">{job} Applicants</h3>
            <p>Field: {fieldName}</p>
            {
                applicantsData.length ? (
                    applicantsData.map((applicant, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="card-body d-flex flex-wrap justify-content-between">
                                <div className="col-3 mb-3">
                                    {applicant?.userId?.profile ? (
                                        <img
                                            src={`http://localhost:3000/uploads/profile/${applicant?.userId?.profile}`}
                                            alt="emp-profile"
                                            className="img-fluid"
                                            width={"50px"}
                                        />
                                    ) : (
                                        <i className="bi bi-person-circle fs-1 mb-3"></i>
                                    )}
                                    <p>{applicant?.userId?.username}</p>
                                </div>
                                <div className="col-3">
                                    <Link to={`/laborers/${applicant?.userId?._id}`} className="btn btn-primary btn-block">
                                        View More
                                    </Link>
                                </div>
                                <div className="col-3 mb-3">
                                    <p>Status: {applicant?.status}</p>
                                </div>
                                {(jobStatus !== "closed" && applicant?.status === "pending") && (
                                    <div className="d-flex flex-column flex-sm-row">
                                        <button
                                            className="btn btn-warning my-3 me-2"
                                            onClick={() => takeApplicantAction(applicant?.userId?._id, "accept")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger my-3"
                                            onClick={() => takeApplicantAction(applicant?.userId?._id, "reject")}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        No applicants found
                    </div>
                )
            }
        </div>
    );
};

export default ViewApplicants;
