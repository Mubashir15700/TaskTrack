import { useLocation } from 'react-router-dom';
import Header from '../components/Users/Header/Header';
import AdminHeader from '../components/Admin/Header/Header';
import Routers from '../routes/Routers';
import Footer from '../components/Users/Footer/Footer';

const Layout = () => {
  const location = useLocation();

  // List of routes where Header and Footer should be displayed
  const routesToCheck = ['/about', '/contact', '/jobs', '/laborers', '/profile', '/notifications', '/admin'];

  let shouldDisplayHeaderFooter;

  if (location.pathname === "/") {
    shouldDisplayHeaderFooter = true;
  } else if (location.pathname === "/admin/login") {
    shouldDisplayHeaderFooter = false;
  } else {
    // Check if the current route is in the routesToCheck list
    shouldDisplayHeaderFooter = routesToCheck.some(route => location.pathname.startsWith(route));
  }

  let currentUser = 'user';

  return (
    <>
      {shouldDisplayHeaderFooter && currentUser === 'admin' ? (
        <AdminHeader />
      ) : shouldDisplayHeaderFooter && currentUser !== 'admin' ? (
        <Header />
      ) : null}
      <main>
        <Routers />
      </main>
      {(shouldDisplayHeaderFooter && currentUser !== 'admin') && <Footer />}
    </>
  );
};

export default Layout;
