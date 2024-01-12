import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../services/authApi";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoggedIn: false,
        username: null,
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
