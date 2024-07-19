import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import initializeUser from "../../utils/initializeUser";
import { saveSubscription } from "../../api/user/plan";
import SubscriptionStatus from "../../components/Users/SubscriptionStatus";

const Success = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user?.userData);

    useEffect(() => {
        const saveSubscriptionResult = async () => {
            try {
                // Get sessionId from localStorage
                const sessionId = localStorage.getItem("sessionId");

                // Send sessionId to the backend
                const saveResponse = await saveSubscription({ sessionId }); // Pass sessionId to saveSubscription

                if (saveResponse && saveResponse.status === 200) {
                    if (currentUser.currentSubscription === null) {
                        initializeUser("user", dispatch);
                    }
                }
            } catch (error) {
                toast.error("Failed to save subscription data");
                console.log("Save subscription result error: ", error);
            } finally {
                // Remove sessionId from localStorage
                localStorage.removeItem("sessionId");
            }
        };

        saveSubscriptionResult();
    }, []);

    return (
        <SubscriptionStatus
            title={"Subscription Successful"}
            color={"#0fad00"}
            description={
                `Congratulations! You've successfully subscribed to our premium service.`
            }
        />
    );
};

export default Success;
