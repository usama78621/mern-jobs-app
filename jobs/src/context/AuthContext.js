import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducer/AuthReducer";
import "../axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  isAuthentication: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const register = async (userInput) => {
    setIsLoading();
    try {
      const { data } = await axios.post(`/auth/register`, { ...userInput });
      dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: "REGISTER_USER_ERROR" });
    }
  };

  const login = async (userInput) => {
    setIsLoading();
    try {
      const { data } = await axios.post(`/auth/login`, { ...userInput });
      dispatch({ type: "LOGIN_USER_SUCCESS", payload: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: "LOGIN_USER_ERROR" });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT_USER" });
  };

  const uploadProductFile = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      await axios.post(`/auth/uploads`, formData, {
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
      const { data } = await axios.get("/auth/getCurrentUser");
      dispatch({ type: "GET_SINGLE_USER", payload: data.user });
    } catch (error) {
      dispatch({ type: "GET_SINGLE_ERROR" });
      logout();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, register, login, logout, uploadProductFile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthGobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
