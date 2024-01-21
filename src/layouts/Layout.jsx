import { useLocation } from "react-router-dom";
import Routers from "../routes/Routers";
import Header from "../components/Users/Header/Header";
import AdminHeader from "../components/Admin/Header/AdminHeader";
import Footer from "../components/Users/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // List of user routes where Header and Footer should be displayed
  const userRoutesToCheck = [
    "/",
    "/about",
    "/contact",
    "/jobs",
    /^\/jobs\/[\w-]+?$/,
    "/jobs/listed-jobs",
    /^\/jobs\/listed-jobs\/[\w-]+?$/,
    "/jobs/works-history",
    "/laborers",
    /^\/laborers\/[\w-]+?$/,
    "/become-laborer-form",
    "/account",
    "/profile",
    "/notifications",
    /^\/notifications\/[\w-]+?$/,
  ];

  // List of admin routes where Header and Footer should be displayed
  const adminRoutesToCheck = [
    "/admin",
    "/admin/users",
    /^\/admin\/users\/[\w-]+\/?$/,
    "/admin/laborer-requests",
    /^\/admin\/laborer-requests\/view-request-details\/[\w-]+\/?$/,
    "/admin/subscription-plans",
    "/admin/subscription-plans/add-plan",
    /^\/admin\/subscription-plans\/edit-plan\/([\w-]+)\/?$/,
    "/admin/banners",
    "/admin/banners/add-banner",
    /^\/admin\/banners\/edit-banner\/[\w-]+?$/,
    "/admin/notifications",
    /^\/admin\/notifications\/[\w-]+?$/,
  ];

  const checkToDisplayHeaderFooter = (routes) => {
    return routes.some((route) => {
      if (route instanceof RegExp) {
        return route.test(location.pathname);
      } else {
        return location.pathname === route;
      }
    });
  };

  let userRole;
  let shouldDisplayHeaderFooter;
  if (location.pathname.startsWith("/admin")) {
    userRole = "admin";
    shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(adminRoutesToCheck);
  } else {
    userRole = "user";
    shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(userRoutesToCheck);
  }

  return (
    <>
      {shouldDisplayHeaderFooter && userRole === "admin" ? (
        <AdminHeader />
      ) : shouldDisplayHeaderFooter && userRole === "user" ? (
        <Header />
      ) : null}
      <main style={{ paddingTop: shouldDisplayHeaderFooter ? "71px" : "0" }}>
        <Routers />
      </main>
      {shouldDisplayHeaderFooter && userRole === "user" && <Footer />}
    </>
  );
};

export default Layout;
