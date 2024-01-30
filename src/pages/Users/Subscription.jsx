import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPlans } from "../../api/userApi";
import { loadStripe } from "@stripe/stripe-js/pure";

const Subscription = () => {
    const [plans, setPlans] = useState([]);

    const currentSubscription = useSelector(
        (state) => state.user.userData?.currentSubscription
    );

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

    const makePayment = async () => {
        try {
            const stripe = await loadStripe("pk_test_51OdorbSBs8zQZ4vVMEdwVQpUgEDvXBlLoHM0PPVQSTZt33l46puwOaZjUX6KefQZ0Pc9WNIykcdRXTXiI8CcgD3400oQsZpVHc");

            const body = {
                items: plans
            };

            const headers = {
                "Content-Type": "application/json"
            };

            const response = await fetch("http://localhost:3000/create-subscription", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            console.log("resp: ", response);

            // Check if the response is successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            // Parse the response as JSON
            const session = await response.json();

            // Check if the session ID is present in the response
            if (!session.id) {
                throw new Error("Invalid response from the server");
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            // Check the result of the redirectToCheckout call if needed
            console.log(result);
        } catch (error) {
            console.error(error);
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
                                                            <i className="bi bi-check2-circle"></i> Number photo
                                                        </span>
                                                        <span className="float-right">50 - 200</span>
                                                    </div>
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
                                                        onClick={makePayment}
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
