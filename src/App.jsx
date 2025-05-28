import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import RoutesPage from "./pages/Routes";
import Assignments from "./pages/Assignments";
import Admins from "./pages/Admins";
import Layout from "./components/Layout";
import "@radix-ui/themes/styles.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Theme>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="admins" element={<Admins />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </Theme>
  );
}

export default App;
