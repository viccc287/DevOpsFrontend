import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setIsAuthenticated(true);
      setAdmin(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await auth.login(credentials);
      const { token, admin: adminData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(adminData));

      setIsAuthenticated(true);
      setAdmin(adminData);

      toast.success("Login successful");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.errors?.at(0)?.msg || "Login failed");
      return false;
    }
  };

  const register = async (data) => {
    try {
      const response = await auth.register(data);
      toast.success("Registration successful. Please login.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.errors?.at(0)?.msg || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setIsAuthenticated(false);
    setAdmin(null);
    toast.success("Logged out successfully");
  };

  const value = {
    isAuthenticated,
    admin,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
