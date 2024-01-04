import { useLocation } from "react-router-dom";
import Header from "../components/Users/Header/Header";
import AdminHeader from "../components/Admin/Header/AdminHeader";
import Routers from "../routes/Routers";
import Footer from "../components/Users/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // List of routes where Header and Footer should be displayed
  const routesToCheck = [
    "/",
    "/about",
    "/contact",
    "/jobs",
    /^\/jobs\/[\w-]+?$/,
    "/laborers",
    /^\/laborers\/[\w-]+?$/,
    "/profile",
    "/notifications",
    /^\/notifications\/[\w-]+?$/,
    "/admin",
    "/admin/users",
    /^\/admin\/users\/[\w-]+\/?$/,
    "/admin/subscription-plans",
    "/admin/subscription-plans/add-plan",
    /^\/admin\/subscription-plans\/edit-plan\/([\w-]+)\/?$/,
    "/admin/banners",
    "/admin/banners/add-banner",
    /^\/admin\/banners\/edit-banner\/[\w-]+?$/,
    "/admin/notifications",
    /^\/admin\/notifications\/[\w-]+?$/,
  ];

  let shouldDisplayHeaderFooter = routesToCheck.some((route) => {
    if (route instanceof RegExp) {
      return route.test(location.pathname);
    } else {
      return location.pathname === route;
    }
  });

  let currentUser;
  if (location.pathname.startsWith("/admin")) {
    currentUser = "admin";
  } else {
    currentUser = "user";
  }

  return (
    <>
      {shouldDisplayHeaderFooter && currentUser === "admin" ? (
        <AdminHeader />
      ) : shouldDisplayHeaderFooter && currentUser === "user" ? (
        <Header />
      ) : null}
      <main style={{ paddingTop: shouldDisplayHeaderFooter ? '70px' : '0' }}>
        <Routers />
      </main>
      {shouldDisplayHeaderFooter && currentUser === "user" && <Footer />}
    </>
  );
};

export default Layout;
