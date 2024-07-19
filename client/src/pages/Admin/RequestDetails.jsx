import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getRequest, requestAction } from "../../api/admin/request";
import Address from "../../components/Users/Address";
import SweetAlert from "../../components/SweetAlert";
import socket from "../../socket/socket";

const RequestDetails = () => {
    const [request, setRequest] = useState();
    const [error, setError] = useState();

    const { id } = useParams();

    useEffect(() => {
        const getRequestDetails = async () => {
            try {
                const response = await getRequest(id);
                if (response && response.status === 200 && response.request) {
                    setRequest(response.request);
                } else {
                    setError("Failed to fetch request details.");
                }
            } catch (error) {
                setError("An error occurred while fetching request details.");
                console.error("Error fetching request details:", error);
            }
        };

        getRequestDetails();
    }, [id]);

    const confirmApproveReject = async (action) => {
        const result = await SweetAlert.confirmAction(
            `${action === "approve" ? "Approve" : "Reject"}`,
            `Are you sure you want to ${action} this request?`,
            `${action === "approve" ? "Approve" : "Reject"}`,
            "#d9534f",
            `${action === "reject" ? "text" : ""}`
        );

        if (result.isConfirmed) {
            handleApproveReject(action, result.value);
        }
    };

    const handleApproveReject = async (type, reason) => {
        try {
            const response = await requestAction(
                { requestId: id, userId: request.user?._id, type, reason }
            );
            if (response) {
                if (response.status === 200) {
                    const updatedRequest = await getRequest(id);
                    if (updatedRequest && updatedRequest.status === 200) {
                        toast.success("Request successfully updated");
                        setRequest(updatedRequest.request);

                        socket.emit("request_action", {
                            userId: request.user._id, message:
                                `Your request has been ${type.action === "approve" ? "approved" : "rejected"}`
                        });
                    } else {
                        setError("Failed to fetch updated request data.");
                    }
                } else {
                    setError("Something went wrong");
                }
            }
        } catch (error) {
            setError("Failed to update request");
            console.error("request action error: ", error);
        }
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    return (
        <div className="col-10 my-3 mx-auto">
            {request ? (
                <div className="p-3 p-lg-5 border">
                    {/* <div>
                        {request.user.profile ? (
                            <img
                                src={`${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${request.user?.profile}`}
                                alt="profileImage"
                                style={{ height: "130px", width: "150px" }}
                                className="rounded-3"
                            />
                        ) : (
                            <div id="personIcon" style={{ display: "block" }}>
                                <i className="bi bi-person-circle fs-1"></i>
                            </div>
                        )}
                    </div> */}
                    <div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={request?.user?.username}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    value={request?.user?.phone}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={request?.user?.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Address
                                label={"Lives In"}
                                currentAddress={request?.user?.location}
                                usage={"admin"}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <label>Languages Known</label>
                            <input
                                type="text"
                                className="form-control"
                                name="languages"
                                value={request?.languages}
                                disabled
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <label>Education</label>
                            <input
                                type="text"
                                className="form-control"
                                name="education"
                                value={request?.education}
                                disabled
                            />
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Available Days</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={request?.avlDays}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Available Times</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    value={request?.avlTimes}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            {request.fields && request.fields.map((field, index) => (
                                <div key={index} className="p-3 mb-3">
                                    <p className="mb-3"><strong>Work Category: {field.name}</strong></p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="mb-1">Works Done: {field.worksDone}</p>
                                            <p className="mb-1">Preferred Wage: {field.wagePerHour}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {request.status === "pending" && (
                            <>
                                <button
                                    className="btn btn-warning my-3 me-2"
                                    onClick={() => confirmApproveReject("approve")}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn btn-danger my-3"
                                    onClick={() => confirmApproveReject("reject")}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mt-5 mx-auto">
                    <p>No data found</p>
                </div>
            )
            }
        </div >
    );
};

export default RequestDetails;
