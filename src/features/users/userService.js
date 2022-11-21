/* eslint-disable import/prefer-default-export */
import { api } from '../../api/baseAPI';
import { setUsers, setError } from './userSlice';

export function fetchUsers() {
  return async (dispatch) => {
    api
      .get('/users')
      .then((response) => {
        dispatch(setUsers(response.data));
      })
      // eslint-disable-next-line no-unused-vars
      .catch((er) => {
        dispatch(setError());
      });
  };
}
