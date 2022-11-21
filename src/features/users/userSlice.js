/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// initial state
export const initialState = {
  loading: false,
  error: false,
  users: [],
};

// our slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setUsers: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

// export the actions
export const { setLoading, setUsers, setError } = userSlice.actions;

// export the selector (".users" being same as in slices/index.js's "items: something")
export const usersSelector = (state) => state.users;
export default userSlice.reducer;
