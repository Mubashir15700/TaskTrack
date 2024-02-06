import { Link } from "react-router-dom";

const Job = ({
    isListed,
    title,
    profile,
    username,
    description,
    village,
    district,
    postedAt,
    status,
    id
}) => {
    return (
        <>
            <div className="card-header">
                {title}
            </div>
            <div className="card-body d-flex flex-wrap justify-content-between">
                {!isListed && (
                    <div className="col-md-3 col-12 mb-3">
                        {profile ? (
                            <img src={`http:/ocalhost:3000/uploads/profile/${profile}`}
                                alt="emp-profile"
                                className="img-fluid"
                                width={"50px"}
                            />
                        ) : (
                            <i className="bi bi-person-circle fs-1 mb-3"></i>
                        )}
                        <p>{username}</p>
                    </div>
                )}
                <div className="col-md-6 col-12 mb-3">
                    <p className="card-text">{description.slice(0, 100)}...</p>
                    <p className="mb-1">Location: {village}, {district}</p>
                    <p className="mb-1">Posted on: {new Date(postedAt).toLocaleString()}</p>
                </div>
                <div className="col-md-3 col-12 mb-3">
                    <p>Status: {status}</p>
                    {isListed ? (
                        <Link to={`/jobs/listed-jobs/${id}`} className="btn btn-primary btn-block">
                            Edit
                        </Link>
                    ) : (
                        <Link to={`/jobs/${id}`} className="btn btn-primary btn-block">View More</Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Job;
