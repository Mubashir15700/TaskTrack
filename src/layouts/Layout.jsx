import { useLocation } from "react-router-dom";
import Header from "../components/Users/Header/Header";
import AdminHeader from "../components/Admin/Header/Header";
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
    /^\/jobs(\/[\w-]+)?$/,
    "/laborers",
    /^\/laborers(\/[\w-]+)?$/,
    "/profile",
    "/notifications",
    "/admin",
    "/admin/users",
    /^\/admin\/user\/[\w-]+\/?$/,
    "/admin/subscription-plans",
    /^\/admin\/subscription-plan\/[\w-]+\/?$/,
    "/admin/banners",
    /^\/admin\/banner\/[\w-]+\/?$/,
    "/admin/notifications"
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
      <main>
        <Routers />
      </main>
      {shouldDisplayHeaderFooter && currentUser === "user" && <Footer />}
    </>
  );
};

export default Layout;
