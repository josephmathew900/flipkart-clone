import { authConstants } from '../actions/constants';

const initialState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: '',
  message: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticate: true,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        authenticate: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = { ...initialState, loading: true };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initialState,
        loading: false,
        message: action.payload.message,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...initialState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

export default authReducer;
