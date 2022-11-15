import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducer/AuthReducer";
// import "../axios";
const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  isAuthentication: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 

  const authFetch = axios.create({
    baseURL: `http://localhost:5000/`,
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const setIsLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const register = async (userInput) => {
    setIsLoading();
    try {
      const { data } = await authFetch.post(`/auth/register`, { ...userInput });
      dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({ type: "REGISTER_USER_ERROR" });
    }
  };

  const login = async (userInput) => {
    setIsLoading();
    try {
      const { data } = await authFetch.post(`/auth/login`, { ...userInput });
      dispatch({ type: "LOGIN_USER_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({ type: "LOGIN_USER_ERROR" });
    }
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: "LOGOUT_USER" });
  };

  const uploadProductFile = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      await authFetch.post(`/auth/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: "PROFILE_IMAGE_UPLOAD" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "PROFILE_IMAGE_ERROR" });
    }
  };

  const getCurrentUser = async () => {
    setIsLoading();
    try {
      const { data } = await authFetch.get("/auth/getCurrentUser");
      console.log("D",data.user);
      dispatch({ type: "GET_SINGLE_USER", payload: data.user });
    } catch (error) {
      logoutUser();
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        register,
        login,
        logoutUser,
        uploadProductFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthGobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
