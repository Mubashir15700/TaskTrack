import { setAdminNotificationCount } from "../redux/slices/adminSlice";
import toast from "react-hot-toast";

const handleNotifyRequestSubmit = (dispatch, newCount) => {
    dispatch(setAdminNotificationCount(newCount));
    toast.success("A new request received!");
};

export { handleNotifyRequestSubmit };
