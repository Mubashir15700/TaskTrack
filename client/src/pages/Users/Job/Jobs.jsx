import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";
import Job from "../../../components/Users/Job";
import NearMeButton from "../../../components/Users/NearMeButton";
import { getJobs } from "../../../api/user/job";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchResults = useSelector(state => state.user?.searchResults);
  const currentUserId = useSelector(state => state.user?.userData?._id);

  let currentUserLocation;
  if (currentUserId) {
    currentUserLocation = useSelector(state => state.user?.userData?.location);
    if (currentUserLocation && typeof currentUserLocation === "string") {
      currentUserLocation = JSON.parse(currentUserLocation);
    }
  }
  const { lat, lon } = currentUserLocation || {};

  const getAllJobs = async (page, lat, lon) => {
    try {
      setLoading(true);
      const response = await getJobs(currentUserId, page, lat, lon);
      if (response && response.status === 200) {
        setJobs((prevJobs) => [...prevJobs, ...response.jobs]);
        setPage((prevPage) => prevPage + 1);
        setTotalPages(response.totalPages);
      } else {
        toast.error("Failed to fetch jobs");
      }
    } catch (error) {
      toast.error("An error occured while fetching jobs");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchResults.searchOn === "jobs") {
      setJobs(searchResults.results);
    } else {
      getAllJobs(page);
    }
  }, [searchResults]);

  // Function to handle NearMeButton click
  const handleNearMeClick = () => {
    if (lat && lon) {
      setJobs([]);
      setTotalPages(0);
      getAllJobs(1, lat, lon);
    } else {
      // Do something if lat and lon are not available
      toast.error("Latitude and longitude are not available.");
      console.log("Latitude and longitude are not available.");
    }
  };

  return (
    <div className="col-10 mx-auto my-3">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Jobs</h3>
            <NearMeButton
              text={"Find jobs near me"}
              purpose={"jobs"}
              onClickNearMe={handleNearMeClick}
            />
          </div>

          {jobs.length ? (
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
              No data found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
