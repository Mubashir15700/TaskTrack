import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/Common/SweetAlert";
import { getJob, applyJob, cancelApplication } from "../../../api/userApi";
import Address from "../../../components/Users/Address";
import socket from "../../../socket/socket";

const JobDetails = () => {
  const [job, setJob] = useState({});

  const currentUserId = useSelector(state => state.user?.userData?._id);
  const isJobSeeker = useSelector(state => state.user?.userData?.isJobSeeker);
  const { id } = useParams();

  const getJobDetails = async () => {
    try {
      const response = await getJob(id);
      if (response && response.data.status === "success") {
        setJob(response.data.job);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [id]);

  const confirmAction = async (title, text, fieldName) => {

    const result = await SweetAlert.confirmAction(
      title,
      text,
      "Confirm",
      "#d9534f"
    );

    if (result.isConfirmed) {
      if (title === "Express Interest") {
        expressInterest(fieldName);
      } else {
        removeInterest(fieldName);
      }
    }
  };

  const expressInterest = async (field) => {
    if (isJobSeeker) {
      try {
        const response = await applyJob({ jobId: id, field, laborerId: currentUserId });
        if (response && response.data.status) {
          toast.success("Successfully applied for this job");
          getJobDetails();
          socket.emit("new_applicant", { empId: job.userId, jobId: id });
        } else {
          toast.error("Failed to apply for this job");
        }
      } catch (error) {
        console.log("Error while applying job:", error);
        toast.error("An error occurred while applying for this job");
      }
    } else {
      toast.error("You are not a laborer");
    }
  };

  const removeInterest = async (field) => {
    try {
      const response = await cancelApplication({ jobId: id, field, laborerId: currentUserId });
      if (response && response.data.status) {
        toast.success("Successfully cancelled application for this job");
        getJobDetails();
        socket.emit("application_cancel", { empId: job.userId, jobId: id });
      } else {
        toast.error("Failed to cancel application for this job");
      }
    } catch (error) {
      console.log("Error while cancelling job applicaton:", error);
      toast.error("An error occurred while cancelling application for this job");
    }
  };

  // Helper function to check if the user has expressed interest in a field
  const hasExpressedInterest = (field, currentUserId) => {
    return field.applicants.some(applicant => applicant.userId === currentUserId);
  };

  return (
    <div className="col-md-8 col-10 my-3 mx-auto">
      <h3 className="mb-4">{job.title}</h3>
      {
        job ? (
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <p>{job.title}</p>
              <p>
                Posted on: {new Date(job.postedAt).toLocaleDateString(undefined, {
                  day: "2-digit", month: "short", year: "numeric"
                })}
              </p>
            </div>
            <div className="card-body d-flex flex-column flex-md-row justify-content-between">
              <div className="col-md-4">
                {job.userDetails?.profile ? (
                  <img src={`http://localhost:3000/uploads/profile/${job?.userDetails?.profile}`} alt="emp-profile" />
                ) : (
                  <i className="bi bi-person-circle fs-1 mb-3"></i>
                )}
                <div>
                  <p className="">{job?.userDetails?.username}</p>
                  <div className="d-flex align-items-center me-3">
                    <Link
                      to={`/chat/${job?.userId}/${job?.userDetails?.username}`}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-chat-dots"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center col-md-8">
                <p className="card-text">{job.description}</p>
              </div>
            </div>
            <div className="px-1">
              <Address
                label={"Location"}
                currentAddress={job.location}
                usage={"display-job"}
              />
            </div>
            <div className="mt-3">
              {job.fields && job.fields.map((field, index) => (
                <div key={index} className="p-3 mb-3">
                  <p className="mb-3"><strong>Work Category: {field.name}</strong></p>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">Workers Needed: {field.workers}</p>
                      <p className="mb-1">Materials Required: {field.materialsRequired}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Wage Per Hour:</strong> {field.wagePerHour}</p>
                      <p>Status: {job.status}</p>
                    </div>
                    <div className="col-md-3">
                      {job.status !== "closed" && (
                        hasExpressedInterest(field, currentUserId) ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => confirmAction("Cancel Application", "Are you sure you want to cancel this application?", field.name)}
                          >
                            Cancel Application
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => confirmAction("Express Interest", "Are you sure you want to express interest in this field?", field.name)}
                          >
                            Express Interest
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            No job found
          </div>
        )
      }
    </div>
  );
};

export default JobDetails;
