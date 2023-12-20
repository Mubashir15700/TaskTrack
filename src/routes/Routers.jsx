import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Jobs from '../pages/Job/Jobs';
import JobDetails from '../pages/Job/JobDetails';
import PostJob from '../pages/Job/PostJob';
import Laborers from '../pages/Laborer/Laborers';
import LaborerDetails from '../pages/Laborer/LaborerDetails';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/job/:id" element={<JobDetails />} />
    <Route path="/post-job" element={<PostJob />} />
    <Route path="/laborers" element={<Laborers />} />
    <Route path="/laborer/:id" element={<LaborerDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<SignUp />} />
  </Routes>
};

export default Routers;
