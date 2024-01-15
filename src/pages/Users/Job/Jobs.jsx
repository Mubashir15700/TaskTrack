import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJobs } from "../../../services/userApi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const searchResults = useSelector(state => state.user.searchResults);
  const currentUserId = useSelector(state => state.user.userData._id);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await getJobs({ currentUserId });
        if (response && response.data.status === "success") {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResults.searchOn === "jobs") {
      setJobs(searchResults.results);
    } else {
      getAllJobs();
    }
  }, [searchResults]);

  return (
    <div className="col-10 mx-auto mt-3">
      <h3 className="mb-4">Jobs</h3>
      {
        jobs.length ? (
          jobs.map((job, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-header">
                {job.title}
              </div>
              <div className="card-body d-flex flex-wrap justify-content-between">
                <div className="col-md-3 col-12 mb-3">
                  {job.userDetails?.profile ? (
                    <img
                      src={`http://localhost:3000/uploads/profile/${job.userDetails?.profile}`}
                      alt="emp-profile"
                      className="img-fluid"
                      width={"50px"}
                    />
                  ) : (
                    <i className="bi bi-person-circle fs-1 mb-3"></i>
                  )}
                  <p>{job.userDetails?.username}</p>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <p className="card-text">{job.description}</p>
                  <p className="mb-1">Location: {job.location?.village}, {job.location?.district}</p>
                  <p className="mb-1">Posted on: {new Date(job.postedAt).toLocaleString()}</p>
                </div>
                <div className="col-md-3 col-12 mb-3">
                  <p>Status: {job.status}</p>
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary btn-block">View More</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            No jobs found
          </div>
        )
      }
    </div>
  );
};

export default Jobs;
