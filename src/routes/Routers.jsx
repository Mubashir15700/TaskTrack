import { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setLoading, initializeAdmin, setSearchResults } from "../redux/slices/adminSlice";
import { initializeUser } from "../redux/slices/userSlice";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

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
    <ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/admin*"
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
