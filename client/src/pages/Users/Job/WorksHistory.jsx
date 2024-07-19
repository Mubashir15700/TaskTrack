import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getWorksHistory } from "../../../api/user/job";
import { getLaborer } from "../../../api/user/laborer";
import { getPrevRequest, cancelRequest } from "../../../api/user/request";
import SweetAlert from "../../../components/SweetAlert";
import Job from "../../../components/Users/Job";

const WorksHistory = () => {
    const navigate = useNavigate();
    const currentUserId = useSelector((state) => state.user.userData._id);
    const isJobSeeker = useSelector((state) => state.user.userData.isJobSeeker);

    const [works, setWorks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pendingRequest, setPendingRequest] = useState({});
    const [rejectReason, setRejectReason] = useState(null);

    const getAllWorksHistory = async () => {
        try {
            const response = await getWorksHistory(currentUserId, page);
            if (response && response.status === 200) {
                setWorks(response.works);
                setPage((prevPage) => prevPage + 1);
                setTotalPages(response.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAnyPendingRequest = async () => {
        try {
            const response = await getPrevRequest(currentUserId);
            if (response && response.status === 200) {
                const responseData = response.request;
                if (responseData) {
                    const workData = {
                        userId: responseData.userId,
                        languages: responseData.languages,
                        education: responseData.education,
                        avlDays: responseData.avlDays,
                        avlTimes: responseData.avlTimes,
                        fields: responseData.fields,
                        status: responseData.status,
                    };
                    setPendingRequest(workData);
                    if (response.reason) {
                        setRejectReason(response.reason);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllWorksHistory();
        getAnyPendingRequest();
    }, []);

    const confirmCancelRequest = async () => {
        const result = await SweetAlert.confirmAction(
            "Cancel Request",
            "Are you sure you want to cancel this request?",
            "Cancel",
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleCancelRequest();
        }
    };

    const handleCancelRequest = async () => {
        try {
            const response = await cancelRequest({ currentUserId });
            if (response) {
                if (response.status === 200) {
                    toast.success("Cancelled request successfully");
                    navigate("/account");
                } else {
                    toast.error(response?.message);
                }
            } else {
                toast.error("Failed to cancel request. Please try again.");
            }
        } catch (error) {
            console.error("Error cancelling request:", error);
            toast.error("An error occurred while cancelling the request. Please try again.");
        }
    };

    const handleLinkClick = async () => {
        try {
            const response = await getLaborer(currentUserId);
            if (response && response.status === 200) {
                // Extract relevant data from the response
                const { languages, education, avlDays, avlTimes, fields } = response.laborer;

                const laborerProfileData = {
                    userId: currentUserId,
                    languages: languages ?? "",
                    education: education ?? "",
                    avlDays: avlDays,
                    avlTimes: avlTimes,
                    fields: fields,
                };

                navigate("/laborer-profile", { state: { laborerProfileData } });
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurerd while fetching data");
            console.log("Get laborer profile error: ", error);
        }
    };

    return (
        <div className="col-10 mx-auto my-3">
            <h3 className="mb-4">Your Work History</h3>
            {
                works.length ? (
                    <InfiniteScroll
                        dataLength={works.length}
                        hasMore={page <= totalPages}
                        loader={<div>Hang on, loading content...</div>}
                        next={() => getAllWorksHistory()}
                    >
                        {works.map((work, index) => (
                            <div className="card mb-3" key={index}>
                                <Job
                                    isListed={false}
                                    title={work.title}
                                    description={work.description}
                                    village={work.location.village}
                                    district={work.location.district}
                                    postedAt={work.postedAt}
                                    status={work.status}
                                    id={work._id}
                                />
                            </div>
                        ))}
                    </InfiniteScroll>
                ) : (
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <p>You haven't done any works yet</p>
                        {Object.values(pendingRequest).length > 0 ? (
                            <>
                                <p>
                                    {pendingRequest.status === "pending" ?
                                        "Your request to become laborer has been sent to admin." :
                                        `Your request to become laborer has been ${pendingRequest.status}`}
                                </p>
                                {rejectReason && <p>Reason: {rejectReason}</p>}
                                <div className="d-md-flex justify-content-between col-6">
                                    {pendingRequest.status !== "approved" ? (
                                        <Link
                                            to="/become-laborer-form"
                                            {...(pendingRequest && { state: pendingRequest })}
                                            className="btn btn-primary col-12 col-md-5 mb-2"
                                        >
                                            View Request
                                        </Link>
                                    ) : (
                                        <Link
                                            onClick={() => handleLinkClick()}
                                            className="btn btn-primary col-12 col-md-5 mb-2"
                                        >
                                            Manage Laborer Profile
                                        </Link>
                                    )}
                                    <button
                                        className="btn btn-danger col-12 col-md-5 mb-2"
                                        onClick={confirmCancelRequest}
                                        disabled={pendingRequest.status !== "pending"}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            !isJobSeeker && (
                                <Link to="/become-laborer-form">
                                    You wanna become a laborer?
                                </Link>
                            )
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default WorksHistory;
