import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { applicantAction } from "../../../api/user/job";
import SweetAlert from "../../../components/Common/SweetAlert";
import socket from "../../../socket/socket";
import {
    MDBCard,
    MDBCardBody,
    MDBBadge,
    MDBBtn,
    MDBCardFooter,
    MDBIcon,
} from "mdb-react-ui-kit";
import IMAGE_URLS from "../../../config/imageUrls";

const ViewApplicants = () => {
    const location = useLocation();
    const [applicantsData, setApplicantsData] = useState(location.state?.applicantsData || []);
    const job = location.state?.job;
    const jobId = location.state?.jobId;
    const jobStatus = location.state?.status;
    const fieldName = location.state?.fieldName;

    const currentUserId = useSelector((state) => state.user.userData?._id);

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
        <div className="col-10 mx-auto mt-3">
            <h3 className="mb-4">{job} Applicants</h3>
            <p>Field: {fieldName}</p>
            {
                applicantsData.length ? (
                    applicantsData.map((applicant, index) => (
                        <MDBCard key={index}>
                            <MDBCardBody>
                                <div className="d-md-flex justify-content-between align-items-center">
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
                                            <p className="fw-bold mb-1">{applicant?.userId?.username}</p>
                                            <p className="text-muted mb-0">{applicant?.userId?.email}</p>
                                        </div>
                                        <MDBBadge pill color="success" light>
                                            {applicant?.status}
                                        </MDBBadge>
                                    </div>
                                    {/* {(jobStatus !== "closed" && applicant?.status === "pending") && ( */}
                                    <div className="d-flex flex-column flex-sm-row align-items-center">
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => confirmApproveReject(applicant?.userId?._id, "accept")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger "
                                            onClick={() => confirmApproveReject(applicant?.userId?._id, "reject")}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                    {/* )} */}
                                </div>
                            </MDBCardBody>
                            <MDBCardFooter background="light" border="0" className="p-2 d-flex justify-content-around">
                                <Link to={`/laborers/${applicant?.userId?._id}`}>
                                    <MDBBtn size="sm" rounded color="link">
                                        View
                                    </MDBBtn>
                                </Link>
                                <MDBBtn color="link" rippleColor="primary" className="text-reset m-0">
                                    Message <MDBIcon fas icon="envelope" />
                                </MDBBtn>
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
