import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Notifications = ({ role }) => {
  // const location = useLocation();

  // const  = location.state;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getAllNotications = async () => {
      try {
        let response;
        if (role === "admin") {
          const response = await getAdminNotifications();
        } else {
          const response = await getUserNotifications(userId);
        }
        if (response && response.data.status === "success") {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllNotications();
  }, []);

  return (
    <>
      <div>Notifications</div>
      <p>{notifications.length}</p>;
    </>
  );
};

export default Notifications;
