export const reducer = (state, { type, payload }) => {
  if (type === "SET_LOADING") {
    return { ...state, isLoading: true, isAuthentication: false };
  }
  if (type === "REGISTER_USER_SUCCESS") {
    return {
      ...state,
      user: payload,
      isLoading: false,
      isAuthentication: true,
    };
  }
  if (type === "REGISTER_USER_ERROR") {
    return { ...state, isLoading: false, user: null, isAuthentication: false };
  }
  if (type === "LOGIN_USER_SUCCESS") {
    return {
      ...state,
      user: payload,
      isLoading: false,
      isAuthentication: true,
    };
  }
  if (type === "LOGIN_USER_ERROR") {
    return { ...state, isLoading: false, user: null, isAuthentication: false };
  }
  if (type === "GET_SINGLE_USER") {
    return {
      ...state,
      user: payload,
      isAuthentication: true,
      isLoading: false,
    };
  }
  if (type === "LOGOUT_USER") {
    return { ...state, isLoading: false, user: null, isAuthentication: false };
  }

 
  return state;
};
