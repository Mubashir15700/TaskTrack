import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLaborers } from "../../../api/userApi";
import prfPlaceholder from "../../../assets/images/prf-placeholder.jfif";

const Laborers = () => {
  const [laborers, setLaborers] = useState([]);

  const searchResults = useSelector(state => state.user.searchResults);
  const currentUserId = useSelector(state => state.user.userData._id);

  useEffect(() => {
    const getAllLaborers = async () => {
      try {
        const response = await getLaborers(currentUserId);
        if (response && response.data.status === "success") {
          setLaborers(response.data.laborers);
        }
      } catch (error) {
        console.log(error);
      }
    };

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
        {laborers.length ? (
          laborers.map((laborer, index) => (
            <Link to={`/laborers/${laborer.user._id}`} className="col-md-4 text-decoration-none" key={index}>
              <div className="card">
                <div className="card-body text-center">
                  {laborer.user.profile ? (
                    <img
                      src={`http://localhost:3000/uploads/profile/${laborer.user.profile}`}
                      alt="Profile"
                      style={{ height: "100px", width: "100px" }}
                      className="rounded-3 mb-2 mx-auto"
                    />
                  ) : (
                    <img
                      src={prfPlaceholder}
                      alt="Profile"
                      style={{ height: "100px", width: "100px" }}
                      className="rounded-3 mb-2 mx-auto"
                    />
                  )}
                  <h6 className="card-subtitle text-muted mb-2">{laborer.user.username}</h6>
                  <p>Job Skills: {laborer.fields.map(field => field.name).join(', ')}</p>
                  <p>{laborer.user.location.district}, {laborer.user.location.state}</p>
                  {/* <Link to={`/laborers/${laborer.user._id}`} className="btn btn-primary">
                    View
                  </Link> */}
                </div>
              </div>
            </Link>
          ))
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
