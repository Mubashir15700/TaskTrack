import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListedJobs } from "../../../api/userApi";

import InfiniteScroll from "react-infinite-scroll-component";

const ListedJobs = () => {
    const currentUserId = useSelector((state) => state.user.userData._id);

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getAllListedJobs = async () => {
        try {
            const response = await getListedJobs(currentUserId, page);
            if (response && response.data.status === "success") {
                setJobs((prevJobs) => [...prevJobs, ...response.data.jobs]);
                setPage((prevPage) => prevPage + 1);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllListedJobs();
    }, []);

    return (
        <div className="col-10 mx-auto mt-3">
            <h3 className="mb-4">Your Listed Jobs</h3>
            {
                jobs.length ? (
                    <InfiniteScroll
                        dataLength={jobs.length}
                        hasMore={page <= totalPages}
                        loader={<div>Hang on, loading content...</div>}
                        next={() => getAllListedJobs()}
                    >
                        {jobs.map((job, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-header">
                                    {job.title}
                                </div>
                                <div className="card-body d-flex flex-wrap justify-content-between">
                                    <div className="col-md-6 col-12 mb-3">
                                        <p className="card-text">{job.description}</p>
                                        <p className="mb-1">Location: {job.location.village}, {job.location.district}</p>
                                        <p className="mb-1">Posted on: {new Date(job.postedAt).toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-3 col-12 mb-3">
                                        <p>Status: {job.status}</p>
                                        <Link to={`/jobs/listed-jobs/${job._id}`} className="btn btn-primary btn-block">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                ) : (
                    <div>
                        You haven't listed any jobs yet
                    </div>
                )
            }
        </div>
    );
};

export default ListedJobs;
