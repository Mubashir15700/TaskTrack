import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListedJobs } from "../../../services/userApi";

const ListedJobs = () => {
    const currentUserId = useSelector((state) => state.user.userData._id);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getAllListedJobs = async () => {
            try {
                const response = await getListedJobs(currentUserId);
                if (response && response.data.status === "success") {
                    setJobs(response.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllListedJobs();
    }, []);

    return (
        <div className="col-md-10 mx-auto mt-3">
            <h3 className="mb-2">View listed jobs</h3>
            {jobs.length ? (
                jobs.map((job, index) => (
                    <div className="d-flex flex-md-row border p-3 mb-2" key={index}>
                        <div className="col-md-3 col-12 mb-5">
                            <p>{job.date}</p>
                            <p>{job.time}</p>
                            <p>Duration: {job.duration}(hrs)</p>
                        </div>
                        <div className="d-flex col-md-8 col-12 flex-column flex-md-row">
                            <div className="col-md-8">
                                <span className="d-block text-primary h6 text-uppercase">
                                    {job.title}
                                </span>
                                <p>
                                    {job.description}
                                </p>
                            </div>
                            <div className="">
                                <Link to={`/jobs/${job._id}`} className="btn btn-primary">
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
    );
};

export default ListedJobs;
