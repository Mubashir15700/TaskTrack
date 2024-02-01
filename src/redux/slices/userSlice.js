import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../api/sharedApi/authApi";
import { getUserNotificationCount } from "../../api/userApi";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userData: null,
        userNotificationCount: 0,
        loading: false,
        searchResults: {
            searchOn: null,
            results: null,
        },
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUserNotificationCount: (state, action) => {
            state.userNotificationCount = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
    },
});

// export admin actions and reducer
export const {
    setLoggedIn, setUserData, setUserNotificationCount, setLoading, setSearchResults
} = userSlice.actions;
export default userSlice.reducer;

// Asynchronous initialization function
export const initializeUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role: "user" });
        if (response && response.status === 201) {
            dispatch(setLoggedIn(true));
            const currentUser = response.data.currentUser;

            console.log("init user: ", currentUser);
            
            dispatch(setUserData(currentUser));
            // Fetch and set user notification count
            const responseNotification = await getUserNotificationCount(currentUser._id);
            if (responseNotification && responseNotification.data.status === "success") {
                dispatch(setUserNotificationCount(responseNotification.data.count));
            } else {
                console.error("Failed to fetch user notification count");
            }
        } else {
            dispatch(setLoggedIn(false));
        }
    } catch (error) {
        // Handle error if the authentication check fails
        console.error("Authentication check failed:", error);
        dispatch(setLoggedIn(false));
    } finally {
        dispatch(setLoading(false)); // Set loading to false regardless of success or failure
    }
};
