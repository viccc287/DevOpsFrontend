// Client-side validation utilities based on server validators

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Valid email is required";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateVIN = (vin) => {
  if (!vin) return "VIN is required";
  if (vin.trim().length !== 17) return "VIN must be 17 characters";
  return null;
};

export const validateDate = (date, fieldName) => {
  if (!date) return `${fieldName} is required`;
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime()))
    return `Valid ${fieldName.toLowerCase()} is required`;
  return null;
};

export const validatePositiveNumber = (value, fieldName) => {
  if (!value) return `${fieldName} is required`;
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) return `${fieldName} must be a positive number`;
  return null;
};

export const validateCURP = (curp) => {
  if (!curp) return "CURP is required";
  if (curp.trim().length !== 18) return "CURP must be 18 characters";
  return null;
};

export const validateLatLng = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return `${fieldName} is required`;
  }
  const num = parseFloat(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  return null;
};

// Vehicle validation
export const validateVehicle = (vehicle) => {
  const errors = {};

  const brandError = validateRequired(vehicle.brand, "Brand");
  if (brandError) errors.brand = brandError;

  const modelError = validateRequired(vehicle.model, "Model");
  if (modelError) errors.model = modelError;

  const vinError = validateVIN(vehicle.vin);
  if (vinError) errors.vin = vinError;

  const licensePlateError = validateRequired(
    vehicle.licensePlate,
    "License plate"
  );
  if (licensePlateError) errors.licensePlate = licensePlateError;

  const purchaseDateError = validateDate(vehicle.purchaseDate, "Purchase date");
  if (purchaseDateError) errors.purchaseDate = purchaseDateError;

  const costError = validatePositiveNumber(vehicle.cost, "Cost");
  if (costError) errors.cost = costError;

  return errors;
};

// Driver validation
export const validateDriver = (driver) => {
  const errors = {};

  const fullNameError = validateRequired(driver.fullName, "Full name");
  if (fullNameError) errors.fullName = fullNameError;

  const birthDateError = validateDate(driver.birthDate, "Birth date");
  if (birthDateError) errors.birthDate = birthDateError;

  const curpError = validateCURP(driver.curp);
  if (curpError) errors.curp = curpError;

  const addressError = validateRequired(driver.address, "Address");
  if (addressError) errors.address = addressError;

  const salaryError = validatePositiveNumber(
    driver.monthlySalary,
    "Monthly salary"
  );
  if (salaryError) errors.monthlySalary = salaryError;

  const licenseError = validateRequired(driver.licenseNumber, "License number");
  if (licenseError) errors.licenseNumber = licenseError;

  return errors;
};

// Route validation
export const validateRoute = (route) => {
  const errors = {};

  const nameError = validateRequired(route.name, "Route name");
  if (nameError) errors.name = nameError;

  const routeDateError = validateDate(route.routeDate, "Route date");
  if (routeDateError) errors.routeDate = routeDateError;

  const startLatError = validateLatLng(route.startLat, "Start latitude");
  if (startLatError) errors.startLat = startLatError;

  const startLngError = validateLatLng(route.startLng, "Start longitude");
  if (startLngError) errors.startLng = startLngError;

  const endLatError = validateLatLng(route.endLat, "End latitude");
  if (endLatError) errors.endLat = endLatError;

  const endLngError = validateLatLng(route.endLng, "End longitude");
  if (endLngError) errors.endLng = endLngError;

  const vehicleIdError = validateRequired(route.vehicleId, "Vehicle");
  if (vehicleIdError) errors.vehicleId = vehicleIdError;

  return errors;
};

// Admin validation
export const validateAdmin = (admin) => {
  const errors = {};

  const emailError = validateEmail(admin.email);
  if (emailError) errors.email = emailError;

  if (admin.password !== undefined) {
    const passwordError = validatePassword(admin.password);
    if (passwordError) errors.password = passwordError;
  }

  // Validate invitation code for new admin registration
  if (admin.invitationCode !== undefined) {
    const invitationCodeError = validateRequired(
      admin.invitationCode,
      "Invitation code"
    );
    if (invitationCodeError) errors.invitationCode = invitationCodeError;
  }

  return errors;
};

// Assignment validation
export const validateAssignment = (assignment) => {
  const errors = {};

  const vehicleError = validateRequired(assignment.vehicleId, "Vehicle");
  if (vehicleError) errors.vehicleId = vehicleError;

  const driverError = validateRequired(assignment.driverId, "Driver");
  if (driverError) errors.driverId = driverError;

  return errors;
};
