import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-sm-8 col-sm-offset-3">
                    <h2 style={{ color: "#ff0000" }}>Subscription Canceled</h2>
                    <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                        It looks like the payment process was not completed.
                        Please try again to complete your subscription.
                    </p>
                    <Link to="/manage-subscription">Manage Subscripiton</Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
