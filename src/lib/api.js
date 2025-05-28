import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on login failures - let the login page handle them
    const isLoginRequest = error.config?.url?.includes("/admins/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const auth = {
  login: (credentials) => api.post("/admins/login", credentials),
  register: (data) => api.post("/admins/register", data),
};

// Dashboard
export const dashboard = {
  getStats: async () => {
    const [vehicles, drivers, routes, admins] = await Promise.all([
      api.get("/vehicles"),
      api.get("/drivers"),
      api.get("/routes"),
      api.get("/admins"),
    ]);

    const today = new Date().toISOString().split("T")[0];
    const todayRoutes = routes.data.filter(
      (route) => route.routeDate === today
    );

    return {
      totalAdmins: admins.data.length,
      totalVehicles: vehicles.data.length,
      totalDrivers: drivers.data.length,
      todayRoutes: todayRoutes.length,
    };
  },
};

// Helper function to construct full image URLs
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath; // Already a full URL
  return `${API_BASE_URL.replace("/api", "")}${
    imagePath.startsWith("/") ? imagePath : "/" + imagePath
  }`;
};

// Helper function to process vehicle data and add full image URLs
const processVehicleData = (vehicle) => {
  if (vehicle.photo) {
    vehicle.photo = getFullImageUrl(vehicle.photo);
  }
  return vehicle;
};

// Vehicles
export const vehicles = {
  getAll: async () => {
    const response = await api.get("/vehicles");
    response.data = response.data.map(processVehicleData);
    return response;
  },
  getById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    response.data = processVehicleData(response.data);
    return response;
  },
  create: (data) => {
    // Handle FormData for image upload
    if (data instanceof FormData) {
      return api.post("/vehicles", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return api.post("/vehicles", data);
  },
  update: (id, data) => {
    // Handle FormData for image upload
    if (data instanceof FormData) {
      return api.put(`/vehicles/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return api.put(`/vehicles/${id}`, data);
  },
  delete: (id) => api.delete(`/vehicles/${id}`),
};

// Drivers
export const drivers = {
  getAll: () => api.get("/drivers"),
  getById: (id) => api.get(`/drivers/${id}`),
  create: (data) => api.post("/drivers", data),
  update: (id, data) => api.put(`/drivers/${id}`, data),
  delete: (id) => api.delete(`/drivers/${id}`),
};

// Routes
export const routes = {
  getAll: () => api.get("/routes"),
  getById: (id) => api.get(`/routes/${id}`),
  create: (data) => api.post("/routes", data),
  update: (id, data) => api.put(`/routes/${id}`, data),
  delete: (id) => api.delete(`/routes/${id}`),
};

// Assignments
export const assignments = {
  getAll: () => api.get("/assignments"),
  create: (data) => api.post("/assignments", data),
  unassignVehicle: (vehicleId) =>
    api.delete(`/assignments/vehicle/${vehicleId}`),
  unassignDriver: (driverId) => api.delete(`/assignments/driver/${driverId}`),
};

// Admins
export const admins = {
  getAll: () => api.get("/admins"),
  getById: (id) => api.get(`/admins/${id}`),
  update: (id, data) => api.put(`/admins/${id}`, data),
  delete: (id) => api.delete(`/admins/${id}`),
  register: (data) => api.post("/admins/register", data),
};

export default api;
