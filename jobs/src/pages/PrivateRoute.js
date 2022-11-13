import React from "react";
import { useAuthGobalContext } from "../context/AuthContext";
import Register from "./Register";

const PrivateRoute = ({ Component }) => {
  const { isAuthentication } = useAuthGobalContext();
  console.log(isAuthentication);
  if (!isAuthentication) {
    return <Register />;
  }
  return <Component />;
};
export default PrivateRoute;
