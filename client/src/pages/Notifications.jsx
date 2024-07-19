import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setAdminNotificationCount } from "../redux/slices/adminSlice";
import { setUserNotificationCount } from "../redux/slices/userSlice";
import { getAdminNotifications, markNotificationOpened } from "../api/admin/notification";
import {
  getUserNotifications,
  markNotificationOpened as markUserNotificationOpened
} from "../api/user/notification";
import { MDBBtn, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import IMAGE_URLS from "../configs/imageUrls";

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

  const handleViewButtonClick = async (id, redirectTo) => {
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

  const deleteNotification = (e, id) => {
    e.stopPropagation();
    try {
      alert(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-10 my-3 mx-auto">
      <h3 className="mb-4">Notifications</h3>
      {notifications && notifications.length ? (
        <InfiniteScroll
          dataLength={notifications.length}
          hasMore={page <= totalPages}
          loader={<div>Hang on, loading content...</div>}
          next={getAllNotifications}
        >
          <MDBListGroup light>
            {notifications.map((notification, index) => (
              <div key={index}>
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center px-2 mb-2"
                >
                  <div className="d-md-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={notification?.from?.profile ?
                          `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${notification?.from?.profile}` :
                          IMAGE_URLS.avatar
                        }
                        alt="Profile"
                        style={{ width: "40px" }}
                        className="rounded-circle mb-2 mx-auto img-fluid"
                      />
                      {/* <div className="ms-3">
                        <p className="fw-bold mb-1">{notification?.from?.username}</p>
                        <p className="text-muted mb-0">{notification?.from?.email}</p>
                      </div> */}
                    </div>
                    <div>
                      <div className="ms-5">
                        <p>{notification.message}</p>
                        <p>{new Date(notification.timestamp).toDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-md-flex col-2 justify-content-between">
                    {/* {!notification.isOpened && (
                      <i className="bi bi-dot text-danger fs-1"></i>
                    )} */}
                    <div className="d-flex justify-content-center dropdown">
                      <MDBBtn
                        size="sm"
                        rounded
                        color="link"
                        onClick={() => handleViewButtonClick(notification._id, notification.redirectTo)}
                      >
                        View
                      </MDBBtn>
                    </div>
                    <div className="d-flex justify-content-center dropdown">
                      <a className="nav-link" onClick={(e) => e.stopPropagation()} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="btn" onClick={(e) => deleteNotification(e, notification._id)}>
                            <i className="bi bi-trash me-1"></i>
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </MDBListGroupItem>
              </div>
            ))}
          </MDBListGroup>
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
