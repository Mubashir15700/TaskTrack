import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAdminNotificationCount } from "../../redux/slices/adminSlice";
import { getAdminNotificationDetails, markNotificationRead } from "../../api/adminApi";

const NotificationDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const notificationsCount = useSelector((state) => state.admin.adminNotificationCount);

  const [notification, setNotification] = useState({});

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await getAdminNotificationDetails(id);
        if (response && response.data.status === "success") {
          setNotification(response.data.notification);
          const markResponse = await markNotificationRead(id);
          if (markResponse && markResponse.data.status === "success") {
            await dispatch(setAdminNotificationCount(notificationsCount - 1));
          }
        } else {
          toast.error("Error while fetching notification");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getNotification();
  }, []);

  return (
    <>
      <div>NotificationDetails</div>
      <p>{id}</p>
    </>
  );
};

export default NotificationDetails;