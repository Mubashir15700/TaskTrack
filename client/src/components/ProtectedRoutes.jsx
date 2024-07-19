import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, isLoggedIn, role }) => {
    if (!isLoggedIn) {
        return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
    } else {
        return <>{children}</>
    }
}

export default ProtectedRoutes;
