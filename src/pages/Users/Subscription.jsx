import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { initializeUser } from "../../redux/slices/userSlice";
import SweetAlert from "../../components/Common/SweetAlert";
import { getPlans, getActivePlan, createSubscription, cancelActivePlan } from "../../api/userApi";
import { loadStripe } from "@stripe/stripe-js/pure";

const Subscription = () => {
    const [activePlan, setActivePlan] = useState({});
    const [plans, setPlans] = useState([]);

    const dispatch = useDispatch();

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

        const getActivePlanDetails = async () => {
            try {
                const activePlanResponse = await getActivePlan(currentSubscription);
                if (activePlanResponse && activePlanResponse.data.status === "success") {
                    setActivePlan(activePlanResponse.data.currentPlan);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllPlans();
        getActivePlanDetails();
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

            if (response.status === 409 && response.data.redirectUrl) {
                // User already has a subscription, redirect them to the billing portal
                window.location.href = response.data.redirectUrl;
                return;
            }

            if (response.data && response.data.id) {
                const sessionId = response.data ? response.data.id : null;

                // Store sessionId in a cookie
                Cookies.set("sessionId", sessionId, { expires: 7 });
            }

            if (!response.data.status === "success") {
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            if (!response.data.id) {
                throw new Error("Invalid response from the server");
            }

            await stripe.redirectToCheckout({
                sessionId: response.data.id
            });
        } catch (error) {
            console.error(error);
            toast.error("An error occured");
        }
    };

    const confirmCancelPlan = async () => {
        const result = await SweetAlert.confirmAction(
            "Cancel Subscription",
            "Are you sure you want to cancel current subscription?",
            "Cancel",
            "#d9534f"
        );

        if (result.isConfirmed) {
            cancelCurrentPlan();
        }
    };

    const cancelCurrentPlan = async () => {
        try {
            const response = await cancelActivePlan({
                subscriptionId: activePlan.subscriptionId,
                userId: _id
            });
            if (response && response.data.status === "success") {
                toast.success(response.data.message);
                setActivePlan({});
                dispatch(initializeUser());
            } else {
                toast.error("Failed to cancel subscription: ", response.data.message);
                console.log("Failed to cancel subscription: ", response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occured");
        }
    };

    return (
        <div className="col-10 mx-auto mt-3">
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
                                    onClick={confirmCancelPlan}
                                >
                                    Cancel Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>No active subscription found</div>
            )}
            <div>
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
                                                {
                                                    activePlan?.planId?._id === plan._id ? (
                                                        <button
                                                            className="btn btn-secondary my-3"
                                                            onClick={confirmCancelPlan}
                                                        >
                                                            Cancel Plan
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-outline-primary my-3"
                                                            onClick={() => makePayment(plan)}
                                                        >
                                                            Choose Plan
                                                        </button>
                                                    )
                                                }
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
        </div>
    );
};

export default Subscription;
