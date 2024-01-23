import { setUserNotificationCount } from "../redux/slices/userSlice";
import toast from "react-hot-toast";

const handleNotifyRequestAction = (data, dispatch, newCount) => {
    dispatch(setUserNotificationCount(newCount));
    toast.success(data.message);
};

const handleNotifyChatMessage = (data, dispatch, newCount) => {
    dispatch(setUserNotificationCount(newCount));
    toast.success(data.message);
};

export { handleNotifyRequestAction, handleNotifyChatMessage };
