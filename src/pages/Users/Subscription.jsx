import { useSelector } from "react-redux";

const Subscription = () => {

    const currentSubscription = useSelector((state) => state.user.userData?.currentSubscription);

    return (
        <>
            {
                currentSubscription ? (
                    <div>Subscription</div>
                ) : (
                    <div>No Subscription</div>
                )
            }
        </>
    );
};

export default Subscription;
