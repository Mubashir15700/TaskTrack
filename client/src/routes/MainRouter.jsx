import { useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setSearchResults } from "../redux/slices/adminSlice";
import initializeUser from "../utils/initializeUser";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBoundary from "../components/ErrorBoundary";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const MainRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isInitialized, setIsInitialized] = useState(false);

  const isLoading = useSelector(state => state.common.loading);
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const initialize = async () => {
      dispatch(setSearchResults({
        searchOn: null, results: null
      }));

      if (location.pathname.startsWith("/admin")) {
        !isAdminLoggedIn && await initializeUser("admin", dispatch);
      } else {
        !isUserLoggedIn && await initializeUser("user", dispatch);
      }

      setIsInitialized(true);
    };

    initialize();
  }, [location.pathname, isUserLoggedIn, isAdminLoggedIn]);

  if (isLoading || !isInitialized) {
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

export default MainRouter;
