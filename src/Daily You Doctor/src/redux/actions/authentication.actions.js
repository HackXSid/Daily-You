import { LOGIN, LOGOUT } from '../constants/authentication.constant';

export const loginFunc = (user, token) => ({
  type: LOGIN,
  payload: { user, token },
});

export const logoutFunc = () => ({
  type: LOGOUT,
});
