import { userConstants } from '../actions/constants';

const initialState = {
  error: null,
  message: '',
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTRATION_REQUEST:
      state = { ...state, loading: true };
      break;
    case userConstants.USER_REGISTRATION_SUCCESS:
      state = { ...state, loading: false, message: action.payload.message };
      break;
    case userConstants.USER_REGISTRATION_FAILURE:
      state = { ...state, error: action.payload.error };
      break;
  }

  return state;
};

export default userReducer;
