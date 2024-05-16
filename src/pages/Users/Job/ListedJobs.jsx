import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Job from "../../../components/Users/Job";
import { getListedJobs } from "../../../api/user/job";

const ListedJobs = () => {
    const currentUserId = useSelector((state) => state.user.userData._id);

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getAllListedJobs = async () => {
        try {
            const response = await getListedJobs(currentUserId, page);
            if (response && response.status === 200) {
                setJobs((prevJobs) => [...prevJobs, ...response.jobs]);
                setPage((prevPage) => prevPage + 1);
                setTotalPages(response.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllListedJobs();
    }, []);

    return (
        <div className="col-10 mx-auto my-3">
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
                                <Job
                                    isListed={true}
                                    title={job.title}
                                    description={job.description}
                                    village={job.location.village}
                                    district={job.location.district}
                                    postedAt={job.postedAt}
                                    status={job.status}
                                    id={job._id}
                                />
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
