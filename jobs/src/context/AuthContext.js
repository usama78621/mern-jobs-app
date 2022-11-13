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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: "SET_USER", payload: newUser.name });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthGobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
