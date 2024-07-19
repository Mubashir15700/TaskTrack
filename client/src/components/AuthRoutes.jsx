import { Navigate } from "react-router-dom";

const AuthRoutes = ({ children, isLoggedIn, role }) => {
    if (isLoggedIn) {
        return <Navigate to={role === "admin" ? "/admin" : "/"} />;
    } else {
        return <>{children}</>
    }
}

export default AuthRoutes;
