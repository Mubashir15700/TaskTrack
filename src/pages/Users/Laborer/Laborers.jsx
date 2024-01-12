import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLaborers } from "../../../services/userApi";
import prfPlaceholder from "../../../assets/images/prf-placeholder.jfif";

const Laborers = () => {
  const [laborers, setLaborers] = useState([]);

  const searchResults = useSelector(state => state.user.searchResults);

  useEffect(() => {
    const getAllLaborers = async () => {
      try {
        const response = await getLaborers();
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
    <div className="col-md-10 mx-auto mt-3">
      <h3 className="mb-2">Laborers</h3>
      <div className="row">
        {laborers.length ? (
          laborers.map((laborer, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={prfPlaceholder}
                    alt="Profile"
                    style={{ height: "100px", width: "100px" }}
                    className="rounded-3 mb-2 mx-auto"
                  />
                  <h6 className="card-subtitle text-muted mb-2">{laborer.username}</h6>
                  <Link to={`/laborers/${laborer._id}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
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
