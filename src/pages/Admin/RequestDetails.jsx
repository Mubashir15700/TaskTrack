import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/adminSlice";
import toast from "react-hot-toast";
import { getRequest, requestAction } from "../../services/adminApi";
import Address from "../../components/Users/Address";
import SweetAlert from "../../components/Common/SweetAlert";

const RequestDetails = () => {
    const dispatch = useDispatch();

    const [request, setRequest] = useState();
    const [error, setError] = useState();

    const { id } = useParams();

    useEffect(() => {
        const getRequestDetails = async () => {
            try {
                // dispatch(setLoading(true));
                const response = await getRequest(id);
                console.log(response.data.request);
                if (response && response.data.status === "success" && response.data.request) {
                    setRequest(response.data.request);
                } else {
                    setError("Failed to fetch request details.");
                }
            } catch (error) {
                setError("An error occurred while fetching request details.");
                console.error("Error fetching request details:", error);
            } finally {
                // dispatch(setLoading(false));
            }
        };

        getRequestDetails();
    }, [id]);

    const confirmApproveReject = async (action) => {
        const result = await SweetAlert.confirmAction(
            `${action}`,
            `Are you sure you want to ${action} this request?`,
            `${action}`,
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleApproveReject({ action });
        }
    };

    const handleApproveReject = async (type) => {
        try {
            const response = await requestAction(id, type);
            if (response) {
                if (response.data.status === "success") {
                    const updatedRequest = await getRequest(id);
                    if (updatedRequest && updatedRequest.data.status === "success") {
                        toast.success("Request successfully updated");
                        setRequest(updatedRequest.data.request);
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
                    <div>
                        {request.user.profile ? (
                            <img
                                src={`http://localhost:3000/uploads/profile/${request.user?.profile}`}
                                alt="profileImage"
                                style={{ height: "130px", width: "150px" }}
                                className="rounded-3"
                            />
                        ) : (
                            <div id="personIcon" style={{ display: "block" }}>
                                <i className="bi bi-person-circle fs-1"></i>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    // value={user?.username}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    // value={user?.phone}
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
                                    // value={user?.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Is Verified</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    // value={user?.isVerified}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Is Job Seeker</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    // value={user?.isJobSeeker}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Address
                                label={"Lives In"}
                                // currentAddress={user.location}
                                usage={"admin"}
                            />
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
