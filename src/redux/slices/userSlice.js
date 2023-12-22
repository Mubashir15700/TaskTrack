import { createSlice } from '@reduxjs/toolkit';
import { checkAuth } from '../../services/api';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        username: null,
        loading: false,
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
    },
});

// export admin actions and reducer
export const { setLoggedIn, setUsername, setLoading } = userSlice.actions;
export default userSlice.reducer;

// Asynchronous initialization function
export const initializeUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role: 'user' });
        if (response && response.status === 201) {
            dispatch(setLoggedIn(true));
            dispatch(setUsername(response.data.currentUser.username));
            // console.log(response);
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