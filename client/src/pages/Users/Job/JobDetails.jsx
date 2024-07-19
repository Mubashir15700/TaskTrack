import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/SweetAlert";
import { getJob, applyJob, cancelApplication } from "../../../api/user/job";
import Address from "../../../components/Users/Address";
import ProfileCard from "../../../components/Users/ProfileCard";
import socket from "../../../socket/socket";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBCardTitle,
} from "mdb-react-ui-kit";

export default function JobDetails() {

  const [job, setJob] = useState({});

  const currentUserId = useSelector(state => state.user?.userData?._id);
  const isJobSeeker = useSelector(state => state.user?.userData?.isJobSeeker);
  const { id } = useParams();

  const getJobDetails = async () => {
    try {
      const response = await getJob(id);
      if (response && response.status === 200) {
        setJob(response.job);
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
        if (response && response.status) {
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
      if (response && response.status) {
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
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        {
          job ? (
            <MDBRow>
              <MDBCol lg="4">
                <ProfileCard
                  imageSrc={job.userDetails?.profile}
                  title={"Posted By"}
                  userId={job?.userId}
                  username={job?.userDetails?.username}
                />
                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-2">
                    <Address
                      label={"Location"}
                      currentAddress={job?.location}
                      usage={"display-laborer"}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol className="d-flex justify-content-between">
                        <MDBCardText>{job.title}</MDBCardText>
                        <MDBCardText>
                          Posted on: {new Date(job.postedAt).toLocaleDateString(undefined, {
                            day: "2-digit", month: "short", year: "numeric"
                          })}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBCardText className="text-muted">{job.description}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol>
                        <MDBCardText className="text-muted">
                          Deadline: {new Date(job.date).toLocaleDateString(undefined, {
                            day: "2-digit", month: "short", year: "numeric"
                          })}, {job.time}
                        </MDBCardText>
                        <MDBCardText className="text-muted">
                          Duration: {job.duration}(hrs)
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol>
                        <MDBCardText className="text-muted">
                          Status: {job.status}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBRow>
                  <MDBCol>
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4">Required Workers</MDBCardText>
                        {job.fields && job.fields.map((field, index) => (
                          <MDBCardBody key={index}>
                            <MDBCardTitle>{field.name}</MDBCardTitle>
                            <MDBCardText>
                              Workers Needed: {field.workers}
                            </MDBCardText>
                            <MDBCardText>
                              Materials Required: {field.materialsRequired}
                            </MDBCardText>
                            <MDBCardText>
                              Wage Per Hour: {field.wagePerHour}
                            </MDBCardText>
                            {(currentUserId && job.status !== "closed") && (
                              hasExpressedInterest(field, currentUserId) ? (
                                <MDBBtn
                                  className="bg-danger"
                                  onClick={() => confirmAction("Cancel Application", "Are you sure you want to cancel this application?", field.name)}
                                >
                                  Cancel Application
                                </MDBBtn>
                              ) : (
                                <MDBBtn
                                  onClick={() => confirmAction("Express Interest", "Are you sure you want to express interest in this field?", field.name)}
                                >
                                  Express Interest
                                </MDBBtn>
                              )
                            )}
                            <hr />
                          </MDBCardBody>
                        ))}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          ) : (
            <div>
              No job found
            </div>
          )
        }
      </MDBContainer>
    </section>
  );
};
