import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { getPlans, createSubscription } from "../../api/userApi";
import { loadStripe } from "@stripe/stripe-js/pure";

const Subscription = () => {
    const [plans, setPlans] = useState([]);

    const userData = useSelector((state) => state.user.userData);

    // Destructure the userData object to get _id, email, and currentSubscription
    const { _id, email, currentSubscription } = userData || {};

    useEffect(() => {
        const getAllPlans = async () => {
            try {
                const response = await getPlans();
                if (response && response.data.status === "success") {
                    setPlans(response.data.plans);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllPlans();
    }, []);

    const makePayment = async (plan) => {
        try {
            const stripe = await loadStripe("pk_test_51OdorbSBs8zQZ4vVMEdwVQpUgEDvXBlLoHM0PPVQSTZt33l46puwOaZjUX6KefQZ0Pc9WNIykcdRXTXiI8CcgD3400oQsZpVHc");

            const data = {
                item: plan,
                user: {
                    userId: _id,
                    email
                }
            };

            const response = await createSubscription(data);

            if (response.data && response.data.id) {
                const sessionId = response.data ? response.data.id : null;

                // Store sessionId in a cookie
                Cookies.set("sessionId", sessionId, { expires: 7 });

                if (!response.data.status === "success") {
                    throw new Error(`Server error: ${response.status} - ${response.statusText}`);
                }

                if (!response.data.id) {
                    throw new Error("Invalid response from the server");
                }

                await stripe.redirectToCheckout({
                    sessionId: response.data.id
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occured");
            // Handle the error appropriately, show a message to the user, etc.
        }
    };

    return (
        <div className="col-10 mx-auto mt-3">
            <h3 className="mb-4">Subscription Management</h3>
            {currentSubscription ? (
                <div>Subscription</div>
            ) : (
                <div>
                    <div>No active subscription found</div>
                    <section id="price-section">
                        <div className="container">
                            <div className="row d-flex justify-content-center pt-5">
                                <div className="row justify-content-center gapsectionsecond my-2">
                                    <div className="col-lg-7 text-center">
                                        <h5>Available Subscription Plans</h5>
                                    </div>
                                </div>
                                {plans?.length ? (
                                    plans.map((plan, index) => (
                                        <div
                                            className="card col-8 col-lg-3 py-5 pb-lg-0 mx-2"
                                            key={index}
                                        >
                                            <div className="wrap-price">
                                                <div className="price-innerdetail text-center">
                                                    <h5>{plan.name}</h5>
                                                    <p className="prices">{plan.amount}$</p>
                                                    <div className="detail-pricing">
                                                        <span className="float-left">
                                                            {plan.description}
                                                        </span>
                                                    </div>
                                                    <div className="detail-pricing">
                                                        <span className="float-left">
                                                            {" "}
                                                            <i className="bi bi-check2-circle"></i>{" "}
                                                            {`Can Post ${plan.numberOfJobPosts} jobs`}</span></div>
                                                    <div className="detail-pricing">
                                                        <span className="float-left">
                                                            {" "}
                                                            <i className="bi bi-check2-circle"></i>{" "}
                                                            Consultation
                                                        </span>
                                                        <span className="float-right">Style</span>
                                                    </div>
                                                    <button
                                                        className="btn btn-secondary my-3"
                                                        onClick={() => makePayment(plan)}
                                                    >
                                                        Choose Plan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No available plans found</div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Subscription;
