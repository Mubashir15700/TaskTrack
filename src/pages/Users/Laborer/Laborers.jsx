import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getLaborers } from "../../../api/userApi";
import prfPlaceholder from "../../../assets/images/prf-placeholder.jfif";

const Laborers = () => {
  const [laborers, setLaborers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchResults = useSelector(state => state.user?.searchResults);
  const currentUserId = useSelector(state => state.user.userData?._id);

  const getAllLaborers = async () => {
    try {
      const response = await getLaborers(currentUserId, page);
      if (response && response.data.status === "success") {
        setLaborers(response.data.laborers);
        setPage((prevPage) => prevPage + 1);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchResults.searchOn === "laborers") {
      setLaborers(searchResults.results);
    } else {
      getAllLaborers();
    }
  }, [searchResults]);

  return (
    <div className="col-10 mx-auto mt-3">
      <h3 className="mb-4">Laborers</h3>
      <div className="row">
        {laborers?.length ? (
          <InfiniteScroll
            dataLength={laborers.length}
            hasMore={page <= totalPages}
            loader={<div>Hang on, loading content...</div>}
            next={() => getAllLaborers()}
          >
            {laborers.map((laborer, index) => (
              <Link to={`/laborers/${laborer?.user?._id}`} className="text-decoration-none" key={index}>
                <div className="card col-md-4">
                  <div className="card-body text-center">
                    {laborer?.user?.profile ? (
                      <img
                        src={`http://localhost:3000/uploads/profile/${laborer?.user?.profile}`}
                        alt="Profile"
                        style={{ height: "100px", width: "100px" }}
                        className="rounded-3 mb-2 mx-auto img-fluid"
                      />
                    ) : (
                      <img
                        src={prfPlaceholder}
                        alt="Profile"
                        style={{ height: "100px", width: "100px" }}
                        className="rounded-3 mb-2 mx-auto img-fluid"
                      />
                    )}
                    <h6 className="card-subtitle text-muted mb-2">{laborer?.user?.username}</h6>
                    <p>Job Skills: {laborer?.fields?.map(field => field.name).join(', ')}</p>
                    <p>{laborer?.user?.location?.district}, {laborer?.user?.location?.state}</p>
                  </div>
                </div>
              </Link>
            ))}
          </InfiniteScroll>
        ) : (
          <div>
            No data found
          </div>
        )}
      </div>
    </div>
  );
};

export default Laborers;
