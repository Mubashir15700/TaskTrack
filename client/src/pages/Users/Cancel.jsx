import SubscriptionStatus from "../../components/Users/SubscriptionStatus";

const Cancel = () => {
    return (
        <SubscriptionStatus
            title={"Subscription Canceled"}
            color={"#ff0000"}
            description={`
        It looks like the payment process was not completed.
        Please try again to complete your subscription.`
            }
        />
    );
};

export default Cancel;
