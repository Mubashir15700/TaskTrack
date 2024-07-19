import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Users/Home";
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
import Login from "../pages/Users/Auth/Login";
import SignUp from "../pages/Users/Auth/SignUp";
import Email from "../pages/Users/Auth/Email";
import OTP from "../pages/Users/Auth/OTP";
import ResetPassword from "../pages/Users/Auth/ResetPassword";
const Notifications = lazy(() => import("../pages/Notifications"));
import ErrorPage from "../pages/ErrorPage";
import AuthRoutes from "../components/AuthRoutes";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { userRouteVariables } from "../utils/routeUtils/routeVariables";

const UserRoutes = ({ isLoggedIn }) => {
    const routes = [
        { path: userRouteVariables.Home, element: !isLoggedIn ? <Home /> : <Navigate to="/laborers" /> },
        // Error Page
        { path: userRouteVariables.NotFound, element: <ErrorPage /> },
    ];

    const protectedRoutes = [
        { path: userRouteVariables.Jobs, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Jobs /></ProtectedRoutes> },
        { path: userRouteVariables.Job, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><JobDetails /></ProtectedRoutes> },
        { path: userRouteVariables.Laborers, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Laborers /></ProtectedRoutes> },
        { path: userRouteVariables.Laborer, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><LaborerDetails /></ProtectedRoutes> },
        { path: userRouteVariables.Account, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Account /></ProtectedRoutes> },
        { path: userRouteVariables.Profile, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Profile /></ProtectedRoutes> },
        { path: userRouteVariables.Subscription, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Subscription /></ProtectedRoutes> },
        { path: userRouteVariables.Success, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Success /></ProtectedRoutes> },
        { path: userRouteVariables.Cancel, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Cancel /></ProtectedRoutes> },
        { path: userRouteVariables.Notifications, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Notifications /></ProtectedRoutes> },
        { path: userRouteVariables.PostJob, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><PostJob /></ProtectedRoutes> },
        { path: userRouteVariables.ListedJobs, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><ListedJobs /></ProtectedRoutes> },
        { path: userRouteVariables.ListedJob, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><EditListedJob /></ProtectedRoutes> },
        { path: userRouteVariables.Applicants, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><ViewApplicants /></ProtectedRoutes> },
        { path: userRouteVariables.WorksHistory, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><WorksHistory /></ProtectedRoutes> },
        { path: userRouteVariables.Chats, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Chat /></ProtectedRoutes> },
        { path: userRouteVariables.Chat, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Chat /></ProtectedRoutes> },
        { path: userRouteVariables.LaborerProfile, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><LaborerProfile /></ProtectedRoutes> },
        { path: userRouteVariables.Form, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"user"}><Form /></ProtectedRoutes> },
    ];

    const authRoutes = [
        { path: userRouteVariables.Login, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"user"}><Login role={"user"} /></AuthRoutes> },
        { path: userRouteVariables.SignUp, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"user"}><SignUp /></AuthRoutes> },
        { path: userRouteVariables.Email, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"user"}><Email /></AuthRoutes> },
        { path: userRouteVariables.OTP, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"user"}><OTP /></AuthRoutes> },
        { path: userRouteVariables.Password, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"user"}><ResetPassword /></AuthRoutes> },
    ];

    return (
        <Routes>
            {routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {protectedRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {authRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
        </Routes>
    );
};

export default UserRoutes;
