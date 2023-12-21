import { Routes, Route } from "react-router-dom";
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
import SubscriptionPlans from '../pages/Admin/SubscriptionPlans';
import Banners from '../pages/Admin/Banners';

const Routers = () => {
  return (
    <Routes>
      {/* Users */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/jobs/post-job" element={<PostJob />} />
      <Route path="/laborers" element={<Laborers />} />
      <Route path="/laborers/:id" element={<LaborerDetails />} />
      <Route path="/login" element={<Login role={'user'} />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/verify-email" element={<Email />} />
      <Route path="/verify-otp" element={<OTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Admin */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/login" element={<Login role={'admin'} />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/subscription-plans" element={<SubscriptionPlans />} />
      <Route path="/admin/banners" element={<Banners />} />
      {/* Errors */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
