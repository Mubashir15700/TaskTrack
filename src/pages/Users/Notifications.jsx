import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setAdminNotificationCount } from "../../redux/slices/adminSlice";
import { setUserNotificationCount } from "../../redux/slices/userSlice";
import { getAdminNotifications, markNotificationOpened } from "../../api/admin/notification";
import {
  getUserNotifications,
  markNotificationOpened as markUserNotificationOpened
} from "../../api/user/notification";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state;
  const currentUserId = useSelector((state) => state.user.userData?._id);

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllNotifications = async () => {
    try {
      let response;
      if (role === "admin") {
        response = await getAdminNotifications(page);
        dispatch(setAdminNotificationCount(0));
      } else {
        response = await getUserNotifications(currentUserId, page);
        dispatch(setUserNotificationCount(0));
      }
      if (response && response.status === 200) {
        setNotifications((prevNotifications) => [...prevNotifications, ...response.notifications]);
        setPage((prevPage) => prevPage + 1);
        setTotalPages(response.totalPages);
      } else {
        toast.error("Error while fetching notifications");
      }
    } catch (error) {
      console.log("get all notifications error: ", error);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  const handleButtonClick = async (id, redirectTo) => {
    try {
      if (role === "admin") {
        await markNotificationOpened(id);
      } else {
        await markUserNotificationOpened(id);
      }
      navigate(redirectTo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-10 mx-auto mt-3">
      <h3 className="mb-4">Notifications</h3>
      {notifications && notifications.length ? (
        <InfiniteScroll
          dataLength={notifications.length}
          hasMore={page <= totalPages}
          loader={<div>Hang on, loading content...</div>}
          next={getAllNotifications}
        >
          {notifications.map((notification, index) => (
            <div className="card mb-3" key={index}>
              <div
                className={
                  `card-body d-flex flex-wrap justify-content-between 
                  ${!notification.isOpened && "bg-secondary"}`
                }
              // onClick={() => handleButtonClick(notification._id, notification.redirectTo)}
              >
                <div className="col-md-3 col-12 mb-3">
                  {notification.from?.profile && (
                    <img
                      src={`http://localhost:3000/uploads/profile/${notification.from.profile}`}
                      alt="Profile"
                      style={{ height: "60px", width: "80px" }}
                      className="rounded-3"
                    />
                  )}
                  <p>{notification.from?.username}</p>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <p>{notification.message}</p>
                  <p>{new Date(notification.timestamp).toDateString()}</p>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center col-md-3 col-12 mb-3"
                >
                  <div className="dropdown">
                    <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        sdfdsfds
                      </li>
                    </ul>
                  </div>
                  {!notification.isOpened && (
                    <i className="bi bi-dot text-danger fs-1"></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <div>
          No notifications found
        </div>
      )}
    </div>
  );
};

export default Notifications;
