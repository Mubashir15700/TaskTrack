import { Link } from "react-router-dom";

const SubscriptionStatus = ({ title, color, description }) => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-sm-8 col-sm-offset-3">
                    <h2 style={{ color }}>{title}</h2>
                    <p style={{ fontSize: "20px", color: "#5C5C5C" }}>{description}</p>
                    <Link to="/manage-subscription">Manage Subscripiton</Link>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionStatus;
