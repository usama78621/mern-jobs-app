import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Home, Dashboard, Register, Edit, Error, PrivateRoute } from "./pages";
import Navbar from "./components/Navbar";
import { useAuthGobalContext } from "./context/AuthContext";
function App() {
  const { isAuthentication } = useAuthGobalContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route
          path="/register"
          element={
            !isAuthentication ? (
              <Register />
            ) : (
              <Navigate to="/dashboard" element={<Dashboard />} />
            )
          }
        />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
