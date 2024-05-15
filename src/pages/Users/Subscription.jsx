import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getPlans, getActivePlan, getStripePublicKey, createSubscription } from "../../api/user/plan";
import { loadStripe } from "@stripe/stripe-js/pure";

const Subscription = () => {
    const [activePlan, setActivePlan] = useState({});
    const [plans, setPlans] = useState([]);
    // Define loading state for each button
    const [loading, setLoading] = useState(null);

    const userData = useSelector((state) => state.user.userData);

    const { _id, email, currentSubscription } = userData || {};

    useEffect(() => {
        const getAllPlans = async () => {
            try {
                const response = await getPlans();
                if (response && response.status === 200) {
                    setPlans(response.plans);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getActivePlanDetails = async () => {
            try {
                const activePlanResponse = await getActivePlan(currentSubscription);
                if (activePlanResponse && activePlanResponse.status === 200) {
                    setActivePlan(activePlanResponse.currentPlan);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllPlans();

        currentSubscription && getActivePlanDetails();
    }, []);

    const openStripe = async (plan) => {
        setLoading(plan._id);
        try {
            const getPublicKeyResponse = await getStripePublicKey();

            const stripe = await loadStripe(getPublicKeyResponse.stripePublicKey);

            const data = {
                item: plan,
                user: {
                    userId: _id,
                    email
                }
            };

            const response = await createSubscription(data);

            if (!response.id) {
                throw new Error("Invalid response from the server");
            }

            // Store sessionId in localStorage
            localStorage.setItem("sessionId", response.id);

            if (response.status !== 200) {
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            await stripe.redirectToCheckout({
                sessionId: response.id
            });
        } catch (error) {
            if (error.status === 409 && error.redirectUrl) {
                // User already has a subscription, redirect them to the billing portal
                window.location.href = error.redirectUrl;
                return;
            } else {
                console.error(error);
                toast.error("An error occured");
            }
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="col-10 my-3 mx-auto">
            <h3 className="mb-4">Subscription Management</h3>
            {Object.keys(activePlan).length ? (
                <>
                    <h6>Active Plans</h6>
                    <div className="card mb-3">
                        <div className="card-header">
                            {activePlan?.planId?.name}
                        </div>
                        <div className="card-body d-flex flex-wrap justify-content-between">
                            <div className="col-md-3 col-12 mb-3">
                                <p>
                                    Created at: {activePlan?.createdAt ? new Date(activePlan.createdAt).toLocaleDateString() : ''}
                                </p>
                                <p>Type: {activePlan?.planId?.type}</p>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <p className="card-text"></p>
                                <p className="mb-1">{activePlan?.planId?.description}</p>
                                <p className="mb-1">Total job posts: {activePlan?.planId?.numberOfJobPosts}</p>
                                <p className="mb-1">Remainig job posts: {activePlan?.planId?.numberOfJobPosts - activePlan?.jobPostsCount}</p>
                            </div>
                            <div className="col-md-3 col-12 mb-3">
                                <p>Status: {activePlan?.isActive ? "Active" : "Inactive"}</p>
                                <button
                                    className="btn btn-secondary my-3"
                                    disabled={loading === activePlan._id}
                                    onClick={() => openStripe(activePlan)}
                                >
                                    {loading === activePlan._id && (
                                        <span
                                            className="spinner-border spinner-border-sm me-1"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                                    {loading === activePlan._id ? "Opening Stripe..." :
                                        "Manage"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>No active subscription found</div>
            )}
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
                                    className="card col-8 col-lg-3 py-5 pb-lg-0 m-2"
                                    key={index}
                                >
                                    <div className="wrap-price">
                                        <div className="price-innerdetail text-center">
                                            <h5>{plan.name}</h5>
                                            <p className="prices">₹{plan.amount}</p>
                                            <div className="detail-pricing">
                                                <span className="float-left">
                                                    {plan.description}
                                                </span>
                                            </div>
                                            <div className="detail-pricing">
                                                <span className="float-left">
                                                    {" "}
                                                    <i className="bi bi-check2-circle"></i>{" "}
                                                    {`Can Post ${plan.numberOfJobPosts} Jobs`}</span></div>
                                            <div className="detail-pricing">
                                                <span className="float-left">
                                                    {" "}
                                                    <i className="bi bi-check2-circle"></i>{" "}
                                                    Consultation
                                                </span>
                                                <span className="float-right">Style</span>
                                            </div>
                                            <button
                                                className="btn btn-outline-primary my-3"
                                                disabled={loading === plan._id}
                                                onClick={() => openStripe(plan)}
                                            >
                                                {loading === plan._id && (
                                                    <span
                                                        className="spinner-border spinner-border-sm me-1"
                                                        aria-hidden="true"
                                                    ></span>
                                                )}
                                                {loading === plan._id ? "Opening Stripe..." :
                                                    activePlan?.planId?._id === plan._id ?
                                                        "Manage" :
                                                        "Choose Plan"
                                                }
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
    );
};

export default Subscription;
