import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, initializeAdmin, setSearchResults } from '../redux/slices/adminSlice';
import { initializeUser } from '../redux/slices/userSlice';
import LoadingSpinner from "../components/Partials/LoadingSpinner";
import Home from "../pages/Users/Home";
import About from "../pages/Users/About";
import Contact from "../pages/Users/Contact";
import Profile from "../pages/Users/Profile";
import Notifications from "../pages/Users/Notifications";
import Jobs from "../pages/Users/Job/Jobs";
import JobDetails from "../pages/Users/Job/JobDetails";
import PostJob from "../pages/Users/Job/PostJob";
import Laborers from "../pages/Users/Laborer/Laborers";
import LaborerDetails from "../pages/Users/Laborer/LaborerDetails";
import Login from "../pages/Users/Auth/Login";
import SignUp from "../pages/Users/Auth/SignUp";
import Email from "../pages/Users/Auth/Email";
import OTP from "../pages/Users/Auth/OTP";
import ResetPassword from "../pages/Users/Auth/ResetPassword";
import ErrorPage from "../pages/Users/ErrorPage";
import Dashboard from '../pages/Admin/Dashboard';
import Users from '../pages/Admin/Users';
import UserDetails from "../pages/Admin/UserDetails";
import SubscriptionPlans from '../pages/Admin/SubscriptionPlans';
import AddPlan from '../pages/Admin/AddPlan';
import EditPlan from '../pages/Admin/EditPlan';
import Banners from '../pages/Admin/Banners';
import AddBanner from "../pages/Admin/AddBanner";
import EditBanner from "../pages/Admin/EditBanner";

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

    if (location.pathname.startsWith('/admin')) {
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
      <Routes>
        {/* Users */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={isUserLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isUserLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/post-job" element={isUserLoggedIn ? <PostJob /> : <Navigate to="/login" />} />
        <Route path="/laborers" element={<Laborers />} />
        <Route path="/laborers/:id" element={<LaborerDetails />} />
        <Route path="/login" element={!isUserLoggedIn ? <Login role={'user'} /> : <Navigate to="/" />} />
        <Route path="/sign-up" element={!isUserLoggedIn ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={!isUserLoggedIn ? <Email /> : <Navigate to="/" />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Admin */}
        <Route path="/admin" element={isAdminLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={!isAdminLoggedIn ? <Login role={'admin'} /> : <Navigate to="/admin" />} />
        <Route path="/admin/users" element={isAdminLoggedIn ? <Users /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/users/:id" element={isAdminLoggedIn ? <UserDetails /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/subscription-plans" element={isAdminLoggedIn ? <SubscriptionPlans /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/subscription-plans/add-plan" element={isAdminLoggedIn ? <AddPlan /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/subscription-plans/edit-plan/:id" element={isAdminLoggedIn ? <EditPlan /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/banners" element={isAdminLoggedIn ? <Banners /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/banners/add-banner" element={isAdminLoggedIn ? <AddBanner /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/banners/edit-banner/:id" element={isAdminLoggedIn ? <EditBanner /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/notifications" element={isAdminLoggedIn ? <Notifications /> : <Navigate to="/admin/login" />} />
        {/* Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Routers;
