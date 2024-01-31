import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { saveSubscription } from "../../api/userApi";

const Success = () => {

    useEffect(() => {
        const saveSubscriptionResult = async () => {
            try {
                await saveSubscription();
            } catch (error) {
                toast.error("Failed to save subscription data");
                console.log("Save subscription result error: ", error);
            }
        };

        saveSubscriptionResult();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-sm-8 col-sm-offset-3">
                    <h2 style={{ color: "#0fad00" }}>Subscription Successful</h2>
                    <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                        Congratulations! You've successfully subscribed to our premium service.
                    </p>
                    <Link to="/manage-subscription">Manage Subscripiton</Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
