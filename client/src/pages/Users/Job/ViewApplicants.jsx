import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { applicantAction } from "../../../api/user/job";
import SweetAlert from "../../../components/SweetAlert";
import socket from "../../../socket/socket";
import { MDBCard, MDBCardBody, MDBBadge, MDBBtn, MDBCardFooter, MDBIcon } from "mdb-react-ui-kit";
import IMAGE_URLS from "../../../config/imageUrls";

const ViewApplicants = () => {
    const location = useLocation();
    const [applicantsData, setApplicantsData] = useState(location.state?.applicantsData || []);
    const job = location.state?.job;
    const jobId = location.state?.jobId;
    const fieldName = location.state?.fieldName;

    const confirmApproveReject = async (laborerId, action) => {
        const result = await SweetAlert.confirmAction(
            `${action === "accept" ? "Accept" : "Reject"}`,
            `Are you sure you want to ${action} this request?`,
            `${action === "accept" ? "Approve" : "Reject"}`,
            "#d9534f",
            `${action === "reject" ? "text" : ""}`
        );

        if (result.isConfirmed) {
            takeApplicantAction(laborerId, action, result.value);
        }
    };

    const takeApplicantAction = async (laborerId, action, reason) => {
        try {
            const actionTook = action === "accept" ? "accepted" : "rejected";
            const response = await applicantAction(
                { jobId, fieldName, laborerId, actionTook, reason }
            );
            if (response && response.status === 200) {
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
        <div className="col-10 mx-auto my-3">
            <h3 className="mb-4">{job} Applicants</h3>
            <p>Field: {fieldName}</p>
            {
                applicantsData.length ? (
                    applicantsData.map((applicant, index) => (
                        <MDBCard key={index}>
                            <MDBCardBody>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={applicant?.userId?.profile ?
                                                `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${applicant?.userId?.profile}` :
                                                IMAGE_URLS.avatar
                                            }
                                            alt=""
                                            style={{ width: "45px", height: "45px" }}
                                            className="rounded-circle"
                                        />
                                        <div className="mx-3">
                                            <p className="mb-1">{applicant?.userId?.username}</p>
                                        </div>
                                    </div>
                                    {job.status !== "closed" && (
                                        <div className="d-flex flex-column flex-md-row align-items-center">
                                            {(applicant?.status === "pending") ? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-warning m-1"
                                                        onClick={() => confirmApproveReject(applicant?.userId?._id, "accept")}
                                                    >
                                                        <i class="bi bi-check2"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => confirmApproveReject(applicant?.userId?._id, "reject")}
                                                    >
                                                        <i class="bi bi-x-lg"></i>
                                                    </button>
                                                </>
                                            ) : (
                                                <MDBBadge pill color={applicant?.status === "accepted" ? "success" : "danger"} light>
                                                    {applicant?.status}
                                                </MDBBadge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </MDBCardBody>
                            <MDBCardFooter background="light" border="0" className="p-2 d-flex justify-content-around">
                                <Link to={`/laborers/${applicant?.userId?._id}`}>
                                    <MDBBtn size="sm" rounded color="link">
                                        View
                                    </MDBBtn>
                                </Link>
                                <Link to={`/chat/${applicant?.userId?._id}/${applicant?.userId?.username}`}>
                                    <MDBBtn color="link" rippleColor="primary" className="text-reset m-0">
                                        Message <MDBIcon fas icon="envelope" />
                                    </MDBBtn>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
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
