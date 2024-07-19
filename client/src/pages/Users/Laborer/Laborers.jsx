import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import NearMeButton from "../../../components/Users/NearMeButton";
import { getLaborers } from "../../../api/user/laborer";
import IMAGE_URLS from "../../../config/imageUrls";

const Laborers = () => {
  const [laborers, setLaborers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchResults = useSelector(state => state.user?.searchResults);
  const currentUserId = useSelector(state => state.user.userData?._id);
  let currentUserLocation;
  if (currentUserId) {
    currentUserLocation = useSelector(state => state.user?.userData?.location);
    if (currentUserLocation && typeof currentUserLocation === "string") {
      currentUserLocation = JSON.parse(currentUserLocation);
    }
  }
  const { lat, lon } = currentUserLocation || {};

  // Function to parse location string into an object
  const parseLocation = (laborer) => ({
    ...laborer,
    user: {
      ...laborer.user,
      location: typeof laborer.user?.location === "string"
        ? JSON.parse(laborer.user.location ?? "null")
        : laborer.user?.location
    }
  });

  const getAllLaborers = async (page, lat, lon) => {
    try {
      const response = await getLaborers(currentUserId, page, lat, lon);
      if (response && response.status === 200) {
        // Parse the location string into an object for each laborer
        const parsedLaborers = response.laborers?.map(parseLocation);
        setLaborers((prevLaborers) => [...prevLaborers, ...parsedLaborers]);
        setPage((prevPage) => prevPage + 1);
        setTotalPages(response.totalPages);
      } else {
        toast.error("Failed to fetch laborers");
      }
    } catch (error) {
      toast.error("An error occured while fetching laborers");
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchResults.searchOn === "laborers") {
      const parsedLaborers = searchResults.results.map(parseLocation);
      setLaborers(parsedLaborers);
    } else {
      getAllLaborers(page);
    }
  }, [searchResults]);

  // Function to handle NearMeButton click
  const handleNearMeClick = () => {
    if (lat && lon) {
      setLaborers([]);
      setTotalPages(0);
      getAllLaborers(1, lat, lon);
    } else {
      // Do something if lat and lon are not available
      toast.error("Latitude and longitude are not available.");
      console.log("Latitude and longitude are not available.");
    }
  };

  return (
    <div className="col-10 mx-auto my-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Laborers</h3>
        <NearMeButton
          text={"Find laborers near me"}
          purpose={"laborers"}
          onClickNearMe={handleNearMeClick}
        />
      </div>
      {laborers?.length ? (
        <InfiniteScroll
          dataLength={laborers.length}
          hasMore={page <= totalPages}
          loader={<div>Hang on, loading content...</div>}
          next={() => getAllLaborers()}
        >
          <div className="row">
            {laborers.map((laborer, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <Link to={`/laborers/${laborer?.user?._id}`} className="text-decoration-none">
                  <div className="card">
                    <div className="card-body text-center">
                      <img
                        src={laborer.user?.profile ?
                          `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${laborer.user?.profile}` :
                          IMAGE_URLS.avatar
                        }
                        alt="Profile"
                        style={{ width: "150px" }}
                        className="rounded-circle mb-2 mx-auto img-fluid"
                      />
                      <h6 className="card-subtitle text-muted mb-2">{laborer?.user?.username}</h6>
                      <p>Job Skills: {laborer?.fields?.map(field => field.name).join(", ")}</p>
                      <p>{laborer?.user?.location?.district}, {laborer?.user?.location?.state}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div>
          No data found
        </div>
      )}
    </div>
  );
};

export default Laborers;
