import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, initializeAdmin, setSearchResults } from "../redux/slices/adminSlice";
import { initializeUser } from "../redux/slices/userSlice";
// Lazy-loaded components
const Home = lazy(() => import("../pages/Users/Home"));
const About = lazy(() => import("../pages/Users/About"));
const Contact = lazy(() => import("../pages/Users/Contact"));
const Notifications = lazy(() => import("../pages/Users/Notifications"));
const NotificationDetails = lazy(() => import("../pages/Users/NotificationDetails"));
const Jobs = lazy(() => import("../pages/Users/Job/Jobs"));
const ListedJobs = lazy(() => import("../pages/Users/Job/ListedJobs"));
const WorksHistory = lazy(() => import("../pages/Users/Job/WorksHistory"));
const EditListedJob = lazy(() => import("../pages/Users/Job/EditListedJob"));
const Laborers = lazy(() => import("../pages/Users/Laborer/Laborers"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Users = lazy(() => import("../pages/Admin/Users/Users"));
const SubscriptionPlans = lazy(() => import("../pages/Admin/Plans/SubscriptionPlans"));
const Banners = lazy(() => import("../pages/Admin/Banners/Banners"));
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Account from "../pages/Users/Account";
import Profile from "../pages/Users/Profile";
import JobDetails from "../pages/Users/Job/JobDetails";
import PostJob from "../pages/Users/Job/PostJob";
import LaborerDetails from "../pages/Users/Laborer/LaborerDetails";
import Requests from "../pages/Admin/Requests";
import RequestDetails from "../pages/Admin/RequestDetails";
import Form from "../pages/Users/Laborer/BecomeLaborerForm/Form";
import Login from "../pages/Users/Auth/Login/Login";
import SignUp from "../pages/Users/Auth/SignUp/SignUp";
import Email from "../pages/Users/Auth/Email/Email";
import OTP from "../pages/Users/Auth/OTP/OTP";
import ResetPassword from "../pages/Users/Auth/ResetPassword/ResetPassword";
import ErrorPage from "../pages/Users/ErrorPage";
import UserDetails from "../pages/Admin/Users/UserDetails";
import AddPlan from "../pages/Admin/Plans/AddPlan";
import EditPlan from "../pages/Admin/Plans/EditPlan";
import AddBanner from "../pages/Admin/Banners/AddBanner";
import EditBanner from "../pages/Admin/Banners/EditBanner";

const Routers = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdminLoading = useSelector(state => state.admin.loading);
  const isUserLoading = useSelector(state => state.user.loading);

  useEffect(() => {
    dispatch(setLoading(true));

    dispatch(setSearchResults({
      searchOn: null, results: null
    }));

    if (location.pathname.startsWith("/admin")) {
      !isAdminLoggedIn && dispatch(initializeAdmin());
    } else {
      !isUserLoggedIn && dispatch(initializeUser());
    }

    dispatch(setLoading(false));
  }, [location.pathname, isUserLoggedIn, isAdminLoggedIn]);

  if (isAdminLoading || isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* toast ui */}
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Users */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={isUserLoggedIn ? <Account /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isUserLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isUserLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/notifications/:id" element={isUserLoggedIn ? <NotificationDetails /> : <Navigate to="/login" />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/post-job" element={isUserLoggedIn ? <PostJob /> : <Navigate to="/login" />} />
          <Route path="/jobs/listed-jobs" element={isUserLoggedIn ? <ListedJobs /> : <Navigate to="/login" />} />
          <Route path="/jobs/works-history" element={isUserLoggedIn ? <WorksHistory /> : <Navigate to="/login" />} />
          <Route path="/jobs/listed-jobs/:id" element={isUserLoggedIn ? <EditListedJob /> : <Navigate to="/login" />} />
          <Route path="/laborers" element={<Laborers />} />
          <Route path="/laborers/:id" element={<LaborerDetails />} />
          <Route path="/become-laborer-form" element={isUserLoggedIn ? <Form /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isUserLoggedIn ? <Login role={"user"} /> : <Navigate to="/" />} />
          <Route path="/sign-up" element={!isUserLoggedIn ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/verify-email" element={!isUserLoggedIn ? <Email /> : <Navigate to="/" />} />
          <Route path="/verify-otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Admin */}
          <Route path="/admin" element={isAdminLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={!isAdminLoggedIn ? <Login role={"admin"} /> : <Navigate to="/admin" />} />
          <Route path="/admin/users" element={isAdminLoggedIn ? <Users /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/users/:id" element={isAdminLoggedIn ? <UserDetails /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/laborer-requests" element={isAdminLoggedIn ? <Requests /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/laborer-requests/view-request-details/:id" element={isAdminLoggedIn ? <RequestDetails /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/subscription-plans" element={isAdminLoggedIn ? <SubscriptionPlans /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/subscription-plans/add-plan" element={isAdminLoggedIn ? <AddPlan /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/subscription-plans/edit-plan/:id" element={isAdminLoggedIn ? <EditPlan /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/banners" element={isAdminLoggedIn ? <Banners /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/banners/add-banner" element={isAdminLoggedIn ? <AddBanner /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/banners/edit-banner/:id" element={isAdminLoggedIn ? <EditBanner /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/notifications" element={isAdminLoggedIn ? <Notifications /> : <Navigate to="/admin/login" />} />
          <Route path="/notifications/:id" element={isUserLoggedIn ? <NotificationDetails /> : <Navigate to="/admin/login" />} />
          {/* Errors */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routers;
