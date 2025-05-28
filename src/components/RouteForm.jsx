import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { validateRoute } from "../lib/validation";
import { vehicles } from "../lib/api";

const RouteForm = ({
  route,
  onSubmit,
  onCancel,
  isLoading,
  isUpdate = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    routeDate: "",
    startLat: "",
    startLng: "",
    endLat: "",
    endLng: "",
    vehicleId: "",
    successful: false,
    problemDescription: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [availableVehicles, setAvailableVehicles] = useState([]);

  useEffect(() => {
   
      loadVehicles();
    

    if (route) {
      setFormData({
        name: route.name || "",
        routeDate: route.routeDate || "",
        startLat: route.startLat || "",
        startLng: route.startLng || "",
        endLat: route.endLat || "",
        endLng: route.endLng || "",
        vehicleId: route.vehicleId || "",
        successful: route.successful || false,
        problemDescription: route.problemDescription || "",
        comments: route.comments || "",
      });
    }
  }, [route, isUpdate]);

  const loadVehicles = async () => {
    try {
      const response = await vehicles.getAll();
      // Filter only assigned vehicles (they should have active assignments)
      const assignedVehicles = response.data.filter(
        (vehicle) => vehicle.isAssigned
      );
      setAvailableVehicles(assignedVehicles);
    } catch (error) {
      toast.error("Failed to load vehicles");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    console.log(`Field changed: ${name}, New value: ${newValue}`);
    

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For updates, validate all provided fields
    const validationErrors = isUpdate ? {} : validateRoute(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    // For updates, only send changed fields
    const submitData = isUpdate
      ? Object.fromEntries(
          Object.entries(formData).filter(([key, value]) => {
            if (route && route[key] !== undefined) {
              return route[key] !== value;
            }
            return value !== "" && value !== false && value !== null;
          })
        )
      : {
          name: formData.name,
          routeDate: formData.routeDate,
          startLat: formData.startLat,
          startLng: formData.startLng,
          endLat: formData.endLat,
          endLng: formData.endLng,
          vehicleId: formData.vehicleId,
        };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Fields that are always required */}
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route Date *
              </label>
              <input
                type="date"
                name="routeDate"
                value={formData.routeDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.routeDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.routeDate && (
                <p className="mt-1 text-sm text-red-600">{errors.routeDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle *
              </label>
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.vehicleId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a vehicle</option>
                {availableVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
                  </option>
                ))}
              </select>
              {errors.vehicleId && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleId}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Latitude *
              </label>
              <input
                type="number"
                step="any"
                name="startLat"
                value={formData.startLat}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startLat ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startLat && (
                <p className="mt-1 text-sm text-red-600">{errors.startLat}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Longitude *
              </label>
              <input
                type="number"
                step="any"
                name="startLng"
                value={formData.startLng}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startLng ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startLng && (
                <p className="mt-1 text-sm text-red-600">{errors.startLng}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Latitude *
              </label>
              <input
                type="number"
                step="any"
                name="endLat"
                value={formData.endLat}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endLat ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endLat && (
                <p className="mt-1 text-sm text-red-600">{errors.endLat}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Longitude *
              </label>
              <input
                type="number"
                step="any"
                name="endLng"
                value={formData.endLng}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endLng ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endLng && (
                <p className="mt-1 text-sm text-red-600">{errors.endLng}</p>
              )}
            </div>
          </div>
        
      

      {/* Fields that can be updated (show for both create and update) */}
      { isUpdate && ( <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="successful"
            checked={formData.successful}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Route completed successfully
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Problem Description
          </label>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>)}
     

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : route ? "Update Route" : "Create Route"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RouteForm;
