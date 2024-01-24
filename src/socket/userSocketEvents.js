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

const handleNotifyNewApplication = (data, dispatch, newCount) => {
    dispatch(setUserNotificationCount(newCount));
    console.log("apply", data);
    toast.success(data.message);
};

const handleNotifyApplicationCancel = (data, dispatch, newCount) => {
    dispatch(setUserNotificationCount(newCount));
    console.log("cancel", data);
    toast.success(data.message);
};

const handleNotifyApplicationAction = (data, dispatch, newCount) => {
    dispatch(setUserNotificationCount(newCount));
    console.log("action", data);
    toast.success(data.message);
};

export {
    handleNotifyRequestAction,
    handleNotifyChatMessage,
    handleNotifyNewApplication,
    handleNotifyApplicationCancel,
    handleNotifyApplicationAction
};
