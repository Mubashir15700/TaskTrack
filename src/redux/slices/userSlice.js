import { createSlice } from '@reduxjs/toolkit';
import { checkAuth } from '../../services/api';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null,
        loading: false,
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
    },
});

// export admin actions and reducer
export const { setLoggedIn, setUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;

// Asynchronous initialization function
export const initializeUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role: 'user' });
        if (response && response.status === 201) {
            dispatch(setLoggedIn(true));
            const currentUser = response.data.currentUser;
            if (response.data.currentUser.location) {
                const locationObject = JSON.parse(response.data.currentUser.location);
                currentUser.location = locationObject;
            }
            dispatch(setUserData(currentUser));
        } else {
            dispatch(setLoggedIn(false));
        }
    } catch (error) {
        // Handle error if the authentication check fails
        console.error('Authentication check failed:', error);
        dispatch(setLoggedIn(false));
    } finally {
        dispatch(setLoading(false)); // Set loading to false regardless of success or failure
    }
};