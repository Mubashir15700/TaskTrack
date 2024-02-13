import { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setSearchResults } from "../redux/slices/adminSlice";
import { setLoading } from "../redux/slices/commonSlice";
import initializeUser from "../utils/initializeUser";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const Routers = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoading = useSelector(state => state.common.loading);
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(setLoading(true));

    dispatch(setSearchResults({
      searchOn: null, results: null
    }));

    if (location.pathname.startsWith("/admin")) {
      !isAdminLoggedIn && initializeUser("admin", dispatch);
    } else {
      !isUserLoggedIn && initializeUser("user", dispatch);
    }

    dispatch(setLoading(false));
  }, [location.pathname, isUserLoggedIn, isAdminLoggedIn]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminRoutes isLoggedIn={isAdminLoggedIn} />}
          />
          <Route
            path="/*"
            element={<UserRoutes isLoggedIn={isUserLoggedIn} />}
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routers;
