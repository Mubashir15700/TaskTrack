import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Job from "../../../components/Users/Job";
import { getJobs } from "../../../api/userApi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchResults = useSelector(state => state.user?.searchResults);
  const currentUserId = useSelector(state => state.user?.userData?._id);

  const getAllJobs = async () => {
    try {
      const response = await getJobs(currentUserId, page);
      if (response && response.data.status === "success") {
        setJobs(response.data.jobs);
        setPage((prevPage) => prevPage + 1);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          <InfiniteScroll
            dataLength={jobs.length}
            hasMore={page <= totalPages}
            loader={<div>Hang on, loading content...</div>}
            next={() => getAllJobs()}
          >
            {jobs.map((job, index) => (
              <div className="card mb-3" key={index}>
                <Job
                  isListed={false}
                  title={job.title}
                  profile={job.userDetails?.profile}
                  username={job.userDetails?.username}
                  description={job.description}
                  village={job.location?.village}
                  district={job.location?.district}
                  postedAt={job.postedAt}
                  status={job.status}
                  id={job._id}
                />
              </div>
            ))}
          </InfiniteScroll>
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
