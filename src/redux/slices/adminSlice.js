import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../api/sharedApi/authApi";
import { getAdminNotificationCount } from "../../api/adminApi";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoggedIn: false,
        username: null,
        adminNotificationCount: 0,
        loading: false,
        searchResults: {
            searchOn: null,
            results: null,
        }
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAdminNotificationCount: (state, action) => {
            state.adminNotificationCount = action.payload;
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
    setLoggedIn,
    setUsername,
    setAdminNotificationCount,
    setLoading,
    setSearchResults
} = adminSlice.actions;

export default adminSlice.reducer;

// Asynchronous initialization function
export const initializeAdmin = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role: "admin" });
        if (response && response.status === 201) {
            dispatch(setLoggedIn(true));
            dispatch(setUsername(response.data.currentUser.username));

            // Fetch and set admin notification count
            const responseNotification = await getAdminNotificationCount();
            if (responseNotification && responseNotification.data.status === "success") {
                dispatch(setAdminNotificationCount(responseNotification.data.count));
            } else {
                console.error("Failed to fetch admin notification count");
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
