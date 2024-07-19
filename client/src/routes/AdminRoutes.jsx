import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
const Users = lazy(() => import("../pages/Admin/Users/Users"));
const UserDetails = lazy(() => import("../pages/Admin/Users/UserDetails"));
const SubscriptionPlans = lazy(() => import("../pages/Admin/Plans/SubscriptionPlans"));
import AddPlan from "../pages/Admin/Plans/AddPlan";
import EditPlan from "../pages/Admin/Plans/EditPlan";
const Subscriptions = lazy(() => import("../pages/Admin/Plans/Subscriptions"));
const Banners = lazy(() => import("../pages/Admin/Banners/Banners"));
import AddBanner from "../pages/Admin/Banners/AddBanner";
import EditBanner from "../pages/Admin/Banners/EditBanner";
const Requests = lazy(() => import("../pages/Admin/Requests"));
const RequestDetails = lazy(() => import("../pages/Admin/RequestDetails"));
import Login from "../pages/Users/Auth/Login";
const Notifications = lazy(() => import("../pages/Notifications"));
import ErrorPage from "../pages/ErrorPage";
import AuthRoutes from "../components/AuthRoutes";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { adminRouteVariables } from "../utils/routeUtils/routeVariables";

const AdminRoutes = ({ isLoggedIn }) => {
    const routes = [
        { path: adminRouteVariables.Dashboard, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Dashboard /></ProtectedRoutes> },
        { path: adminRouteVariables.Users, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Users /></ProtectedRoutes> },
        { path: adminRouteVariables.User, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><UserDetails /></ProtectedRoutes> },
        { path: adminRouteVariables.Requests, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Requests /></ProtectedRoutes> },
        { path: adminRouteVariables.Request, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><RequestDetails /></ProtectedRoutes> },
        { path: adminRouteVariables.Plans, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><SubscriptionPlans /></ProtectedRoutes> },
        { path: adminRouteVariables.AddPlan, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><AddPlan /></ProtectedRoutes> },
        { path: adminRouteVariables.EditPlan, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><EditPlan /></ProtectedRoutes> },
        { path: adminRouteVariables.Subscriptions, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Subscriptions /></ProtectedRoutes> },
        { path: adminRouteVariables.Banners, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Banners /></ProtectedRoutes> },
        { path: adminRouteVariables.AddBanner, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><AddBanner /></ProtectedRoutes> },
        { path: adminRouteVariables.EditBanner, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><EditBanner /></ProtectedRoutes> },
        { path: adminRouteVariables.Notofications, element: <ProtectedRoutes isLoggedIn={isLoggedIn} role={"admin"}><Notifications /></ProtectedRoutes> },
        // Auth Route
        { path: adminRouteVariables.Login, element: <AuthRoutes isLoggedIn={isLoggedIn} role={"admin"}><Login role={"admin"} /></AuthRoutes> },
        // Error Page
        { path: adminRouteVariables.NotFound, element: <ErrorPage /> },
    ];

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};

export default AdminRoutes;
