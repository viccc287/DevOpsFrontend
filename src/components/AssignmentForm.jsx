import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { validateAssignment } from "../lib/validation";
import { vehicles, drivers } from "../lib/api";

const AssignmentForm = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    driverId: "",
  });
  const [errors, setErrors] = useState({});
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    loadAvailableEntities();
  }, []);

  const loadAvailableEntities = async () => {
    try {
      const [vehiclesResponse, driversResponse] = await Promise.all([
        vehicles.getAll(),
        drivers.getAll(),
      ]);

      // Filter only unassigned entities
      const unassignedVehicles = vehiclesResponse.data.filter(
        (v) => !v.isAssigned
      );
      const unassignedDrivers = driversResponse.data.filter(
        (d) => !d.isAssigned
      );

      setAvailableVehicles(unassignedVehicles);
      setAvailableDrivers(unassignedDrivers);
    } catch (error) {
      toast.error("Failed to load available vehicles and drivers");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateAssignment(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              {vehicle.brand} {vehicle.model} - {vehicle.licensePlate}
            </option>
          ))}
        </select>
        {errors.vehicleId && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Driver *
        </label>
        <select
          name="driverId"
          value={formData.driverId}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.driverId ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a driver</option>
          {availableDrivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.fullName} - {driver.licenseNumber}
            </option>
          ))}
        </select>
        {errors.driverId && (
          <p className="mt-1 text-sm text-red-600">{errors.driverId}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create Assignment"}
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

export default AssignmentForm;
