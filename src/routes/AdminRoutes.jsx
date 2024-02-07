import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Login from "../pages/Users/Auth/Login/Login";
const Notifications = lazy(() => import("../pages/Users/Notifications"));
import ErrorPage from "../pages/Users/ErrorPage";

const AdminRoutes = ({ isLoggedIn }) => {

    const navigateToLogin = () => <Navigate to="/admin/login" />;
    const navigateDashboard = () => <Navigate to="/admin" />;

    const routes = [
        { path: "/", element: isLoggedIn ? <Dashboard /> : navigateToLogin() },
        { path: "/users", element: isLoggedIn ? <Users /> : navigateToLogin() },
        { path: "/users/:id", element: isLoggedIn ? <UserDetails /> : navigateToLogin() },
        { path: "/laborer-requests", element: isLoggedIn ? <Requests /> : navigateToLogin() },
        { path: "/laborer-requests/view-request-details/:id", element: isLoggedIn ? <RequestDetails /> : navigateToLogin() },
        { path: "/subscription-plans", element: isLoggedIn ? <SubscriptionPlans /> : navigateToLogin() },
        { path: "/subscription-plans/add-plan", element: isLoggedIn ? <AddPlan /> : navigateToLogin() },
        { path: "/subscription-plans/edit-plan/:id", element: isLoggedIn ? <EditPlan /> : navigateToLogin() },
        { path: "/subscriptions", element: isLoggedIn ? <Subscriptions /> : navigateToLogin() },
        { path: "/banners", element: isLoggedIn ? <Banners /> : navigateToLogin() },
        { path: "/banners/add-banner", element: isLoggedIn ? <AddBanner /> : navigateToLogin() },
        { path: "/banners/edit-banner/:id", element: isLoggedIn ? <EditBanner /> : navigateToLogin() },
        { path: "/notifications", element: isLoggedIn ? <Notifications /> : navigateToLogin() },
        // Auth Route
        { path: "/login", element: !isLoggedIn ? <Login role={"admin"} /> : navigateDashboard() },
        // Error Page
        { path: "/*", element: <ErrorPage /> },
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
