import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERROR,
  FOLLOW_FAIL,
  FOLLOW_REQUEST,
  FOLLOW_RESET,
  FOLLOW_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UNFOLLOW_FAIL,
  UNFOLLOW_REQUEST,
  UNFOLLOW_RESET,
  UNFOLLOW_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_RESET,
  UPDATE_ROLE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  VERIFIED_USER_FAIL,
  VERIFIED_USER_REQUEST,
  VERIFIED_USER_SUCCESS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        verified: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        message: action.payload.message,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Verify Reducer
export const verifyReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFIED_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        verified: false,
      };

    case VERIFIED_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: action.payload.isAuthenticated,
        message: action.payload.message,
      };
    case VERIFIED_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Get user Details
export const userDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
    case UPDATE_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        user: action.payload,
        loading: false,
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        success: action.payload,
        loading: false,
      };
    case UPDATE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case UPDATE_ROLE_RESET:
      return {
        loading: false,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//Get all User
export const allUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Follow Un-follow user
export const followReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_REQUEST:
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };

    case FOLLOW_FAIL:
    case UNFOLLOW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FOLLOW_RESET:
    case UNFOLLOW_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//update Password user
export const update = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
