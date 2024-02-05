import { useLocation } from "react-router-dom";
import Routers from "../routes/Routers";
import Header from "../components/Users/Header/Header";
import AdminHeader from "../components/Admin/Header/AdminHeader";
import Footer from "../components/Users/Footer/Footer";
import { checkToDisplayHeaderFooter } from "../utils/routeUtil";
import { userRoutesToCheck, adminRoutesToCheck } from "../config/routesConfig";

const Layout = () => {
  const location = useLocation();

  const userRole = location.pathname.startsWith("/admin") ? "admin" : "user";
  const shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(
    userRole === "admin" ? adminRoutesToCheck : userRoutesToCheck,
    location
  );

  return (
    <>
      {shouldDisplayHeaderFooter && (
        userRole === "admin" ? <AdminHeader /> : <Header />
      )}
      <main style={{ paddingTop: shouldDisplayHeaderFooter ? "71px" : "0" }}>
        <Routers />
      </main>
      {shouldDisplayHeaderFooter &&
        (userRole === "user" && !location.pathname.includes("chat")) &&
        <Footer />
      }
    </>
  );
};

export default Layout;
