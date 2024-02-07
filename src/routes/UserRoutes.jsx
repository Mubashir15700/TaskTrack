import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Users/Home";
import About from "../pages/Users/About";
import Contact from "../pages/Users/Contact";
const Jobs = lazy(() => import("../pages/Users/Job/Jobs"));
import PostJob from "../pages/Users/Job/PostJob";
const ListedJobs = lazy(() => import("../pages/Users/Job/ListedJobs"));
const ViewApplicants = lazy(() => import("../pages/Users/Job/ViewApplicants"));
const EditListedJob = lazy(() => import("../pages/Users/Job/EditListedJob"));
const WorksHistory = lazy(() => import("../pages/Users/Job/WorksHistory"));
const Laborers = lazy(() => import("../pages/Users/Laborer/Laborers"));
import Form from "../pages/Users/Laborer/BecomeLaborerForm/Form";
const Account = lazy(() => import("../pages/Users/Account"));
const Profile = lazy(() => import("../pages/Users/Profile"));
const Subscription = lazy(() => import("../pages/Users/Subscription"));
const Success = lazy(() => import("../pages/Users/Success"));
const Cancel = lazy(() => import("../pages/Users/Cancel"));
const LaborerProfile = lazy(() => import("../pages/Users/Laborer/LaborerProfile"));
const JobDetails = lazy(() => import("../pages/Users/Job/JobDetails"));
const LaborerDetails = lazy(() => import("../pages/Users/Laborer/LaborerDetails"));
const Chat = lazy(() => import("../pages/Users/Chat"));
import Login from "../pages/Users/Auth/Login/Login";
import SignUp from "../pages/Users/Auth/SignUp/SignUp";
import Email from "../pages/Users/Auth/Email/Email";
import OTP from "../pages/Users/Auth/OTP/OTP";
import ResetPassword from "../pages/Users/Auth/ResetPassword/ResetPassword";
const Notifications = lazy(() => import("../pages/Users/Notifications"));
import ErrorPage from "../pages/Users/ErrorPage";

const UserRoutes = ({ isLoggedIn }) => {

    const navigateToLogin = () => <Navigate to="/login" />;
    const navigateToHome = () => <Navigate to="/" />;

    const routes = [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/jobs", element: <Jobs /> },
        { path: "/jobs/:id", element: <JobDetails /> },
        { path: "/laborers", element: <Laborers /> },
        { path: "/laborers/:id", element: <LaborerDetails /> },
    ];

    const protectedRoutes = [
        { path: "/account", element: isLoggedIn ? <Account /> : navigateToLogin() },
        { path: "/profile", element: isLoggedIn ? <Profile /> : navigateToLogin() },
        { path: "/manage-subscription", element: isLoggedIn ? <Subscription /> : navigateToLogin() },
        { path: "/success", element: isLoggedIn ? <Success /> : navigateToLogin() },
        { path: "/cancel", element: isLoggedIn ? <Cancel /> : navigateToLogin() },
        { path: "/notifications", element: isLoggedIn ? <Notifications /> : navigateToLogin() },
        { path: "/jobs/post-job", element: isLoggedIn ? <PostJob /> : navigateToLogin() },
        { path: "/jobs/listed-jobs", element: isLoggedIn ? <ListedJobs /> : navigateToLogin() },
        { path: "/jobs/view-applicants", element: isLoggedIn ? <ViewApplicants /> : navigateToLogin() },
        { path: "/jobs/works-history", element: isLoggedIn ? <WorksHistory /> : navigateToLogin() },
        { path: "/jobs/listed-jobs/:id", element: isLoggedIn ? <EditListedJob /> : navigateToLogin() },
        { path: "/chat/:id/:username", element: isLoggedIn ? <Chat /> : navigateToLogin() },
        { path: "/laborer-profile", element: isLoggedIn ? <LaborerProfile /> : navigateToLogin() },
        { path: "/become-laborer-form", element: isLoggedIn ? <Form /> : navigateToLogin() },
    ];

    const authRoutes = [
        { path: "/login", element: !isLoggedIn ? <Login role={"user"} /> : navigateToHome() },
        { path: "/sign-up", element: !isLoggedIn ? <SignUp /> : navigateToHome() },
        { path: "/verify-email", element: !isLoggedIn ? <Email /> : navigateToHome() },
        { path: "/verify-otp", element: !isLoggedIn ? <OTP /> : navigateToHome() },
        { path: "/reset-password", element: !isLoggedIn ? <ResetPassword /> : navigateToHome() },
    ];

    return (
        <Routes>
            {routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {protectedRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {authRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default UserRoutes;
