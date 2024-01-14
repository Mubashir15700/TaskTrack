import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJob } from "../../../services/userApi";
import Address from "../../../components/Users/Address";

const JobDetails = () => {
  const [job, setJob] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const response = await getJob(id);
        if (response && response.data.status === "success") {
          setJob(response.data.job);
          console.log(response.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJobDetails();
  }, [id]);

  return (
    <div className="col-md-8 col-10 my-3 mx-auto">
      <h3 className="mb-4">{job.title}</h3>
      {
        job ? (
          <div className="card">
            <div className="card-header">
              {job.title}
            </div>
            <div className="card-body d-flex flex-column flex-md-row justify-content-between">
              <div>
                {job.userDetails?.profile ? (
                  <img src={`http://localhost:3000/uploads/profile/${job?.userDetails?.profile}`} alt="emp-profile" />
                ) : (
                  <i className="bi bi-person-circle fs-1 mb-3"></i>
                )}
                <p className="">{job?.userDetails?.username}</p>
              </div>
              <div>
                <p className="card-text">{job.description}</p>
              </div>
              <div>
                <p className="">
                  Posted on: {new Date(job.postedAt).toLocaleString()}
                </p>
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
                    </div>
                    <div className="col-md-3">
                      <p>Status: {job.status}</p>
                      <button className="btn btn-outline-primary">Express Interest</button>
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
