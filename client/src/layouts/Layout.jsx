import { useLocation } from "react-router-dom";
import MainRouter from "../routes/MainRouter";
import AdminHeader from "../components/Admin/AdminHeader";
import Header from "../components/Users/Header";
import Footer from "../components/Users/Footer";
import { checkToDisplayHeaderFooter } from "../utils/routeUtils/checkRouteMatch";

const Layout = () => {
  const location = useLocation();

  const userRole = location.pathname.startsWith("/admin") ? "admin" : "user";
  const shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(userRole, location);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {shouldDisplayHeaderFooter && (
        userRole === "admin" ? <AdminHeader /> : <Header />
      )}
      <main style={{ flex: 1, paddingTop: shouldDisplayHeaderFooter ? "72px" : 0 }}>
        <MainRouter />
      </main>
      {shouldDisplayHeaderFooter &&
        (userRole === "user" && !location.pathname.includes("chat")) &&
        <Footer />
      }
    </div>
  );
};

export default Layout;
