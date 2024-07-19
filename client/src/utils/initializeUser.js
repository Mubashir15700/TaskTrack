import { checkAuth } from "../api/auth";
import { setLoading } from "../redux/slices/commonSlice";
import {
    setLoggedIn,
    setAdminData,
    setAdminNotificationCount
} from "../redux/slices/adminSlice";
import {
    setLoggedIn as setUserLoggedIn,
    setUserData,
    setUserNotificationCount
} from "../redux/slices/userSlice";
import { getAdminNotificationCount } from "../api/admin/notification";
import { getUserNotificationCount } from "../api/user/notification";

const initializeUser = async (role, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role });
        if (response && response.status === 200) {
            if (role === "admin") {
                dispatch(setLoggedIn(true));
                dispatch(setAdminData(response.currentUser.username));

                // Fetch and set admin notification count
                const responseNotification = await getAdminNotificationCount();
                if (responseNotification && responseNotification.status === 200) {
                    dispatch(setAdminNotificationCount(responseNotification.count));
                } else {
                    console.error("Failed to fetch admin notification count");
                }
            } else if (role === "user") {
                dispatch(setUserLoggedIn(true));
                dispatch(setUserData(response.currentUser));

                // Fetch and set user notification count
                const responseNotification = await getUserNotificationCount(response.currentUser._id);
                if (responseNotification && responseNotification.status === 200) {
                    dispatch(setUserNotificationCount(responseNotification.count));
                } else {
                    console.error("Failed to fetch user notification count");
                }
            }
        } else {
            dispatch(setLoggedIn(false));
        }
    } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(setLoggedIn(false));
    } finally {
        dispatch(setLoading(false));
    }
};

export default initializeUser;
