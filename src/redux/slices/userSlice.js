import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../services/authApi";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userData: null,
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
        setUserData: (state, action) => {
            state.userData = action.payload;
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
export const { setLoggedIn, setUserData, setLoading, setSearchResults } = userSlice.actions;
export default userSlice.reducer;

// Asynchronous initialization function
export const initializeUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role: "user" });
        if (response && response.status === 201) {
            dispatch(setLoggedIn(true));
            const currentUser = response.data.currentUser;
            dispatch(setUserData(currentUser));
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
