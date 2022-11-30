/* eslint-disable import/prefer-default-export */
// import { api } from '../../api/baseAPI';
// import { setUsers, setError } from './userSlice';

// export function fetchUsers() {
//   return async (dispatch) => {
//     api
//       .get('/users')
//       .then((response) => {
//         dispatch(setUsers(response.data));
//       })
//       // eslint-disable-next-line no-unused-vars
//       .catch((er) => {
//         dispatch(setError());
//       });
//   };
// }

/* eslint-disable no-undef */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://reqres.in';

// Login Action
export const userLogin = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`${apiUrl}/api/login`, { email, password }, config);
    localStorage.setItem('userToken', data.token);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
