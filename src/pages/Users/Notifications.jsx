import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAdminNotificationCount } from "../../redux/slices/adminSlice";
import { setUserNotificationCount } from "../../redux/slices/userSlice";
import { getAdminNotifications, markNotificationOpened } from "../../services/adminApi"
import { getUserNotifications, markNotificationOpened as markUserNotificationOpened } from "../../services/userApi";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state;
  const currentUserId = useSelector((state) => state.user.userData?._id);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        let response;
        if (role === "admin") {
          response = await getAdminNotifications();
          dispatch(setAdminNotificationCount(0));
        } else {
          response = await getUserNotifications(currentUserId);
          dispatch(setUserNotificationCount(0));
        }
        if (response && response.data.status === "success") {
          setNotifications(response.data.notifications);
        } else {
          toast.error("Error while fetching notifications");
        }
      } catch (error) {
        console.log("get all notifications error: ", error);
      }
    };

    getAllNotifications();
  }, []);

  const handleButtonClick = async (id) => {
    try {
      if (role === "admin") {
        await markNotificationOpened(id);
        navigate("/admin/laborer-requests");
      } else {
        await markUserNotificationOpened(id);
        navigate("/jobs/works-history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-10 mx-auto mt-3">
      <h3 className="mb-4">Notifications</h3>
      {notifications?.length ? (
        notifications.map((notification, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body d-flex flex-wrap justify-content-between">
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
              <div className="col-md-3 col-12 mb-3">
                <button
                  className="btn btn-primary btn-block me-5"
                  onClick={() => handleButtonClick(notification._id)}
                >
                  View More
                </button>
                {!notification.isOpened && (
                  <i className="bi bi-circle-fill text-danger"></i>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          No notifications found
        </div>
      )}
    </div>
  );
};

export default Notifications;
