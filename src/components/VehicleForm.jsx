import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { validateVehicle } from "../lib/validation";

const VehicleForm = ({ vehicle, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    vin: "",
    licensePlate: "",
    purchaseDate: "",
    cost: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        vin: vehicle.vin || "",
        licensePlate: vehicle.licensePlate || "",
        purchaseDate: vehicle.purchaseDate || "",
        cost: vehicle.cost || "",
        photo: null,
      });
      if (vehicle.photo) {
        setPhotoPreview(vehicle.photo);
      }
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    

    if (name === "photo" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateVehicle(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("brand", formData.brand);
    submitData.append("model", formData.model);
    submitData.append("vin", formData.vin);
    submitData.append("licensePlate", formData.licensePlate);
    submitData.append("purchaseDate", formData.purchaseDate);
    submitData.append("cost", formData.cost);

    if (formData.photo) {
      submitData.append("photo", formData.photo);
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand *
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.brand ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model *
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.model ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.model && (
            <p className="mt-1 text-sm text-red-600">{errors.model}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            VIN *
          </label>
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            maxLength={17}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vin ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.vin && (
            <p className="mt-1 text-sm text-red-600">{errors.vin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Plate *
          </label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.licensePlate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.licensePlate && (
            <p className="mt-1 text-sm text-red-600">{errors.licensePlate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Date *
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.purchaseDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.purchaseDate && (
            <p className="mt-1 text-sm text-red-600">{errors.purchaseDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cost ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cost && (
            <p className="mt-1 text-sm text-red-600">{errors.cost}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo
        </label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {photoPreview && (
          <div className="mt-4">
            <img
              src={photoPreview}
              alt="Vehicle preview"
              className="w-32 h-32 object-cover rounded-md border"
            />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Saving..."
            : vehicle
            ? "Update Vehicle"
            : "Create Vehicle"}
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

export default VehicleForm;
