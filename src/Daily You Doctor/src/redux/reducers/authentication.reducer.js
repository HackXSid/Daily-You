import { LOGIN, LOGOUT } from '../constants/authentication.constant';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: '',
};

export const authenticationReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
