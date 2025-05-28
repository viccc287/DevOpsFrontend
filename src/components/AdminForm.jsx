import { useState } from "react";
import {
  Flex,
  Text,
  Card,
  Heading,
  Button,
  TextField,
  Grid,
} from "@radix-ui/themes";
import {
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
  KeyIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { validateAdmin } from "../lib/validation";

const AdminForm = ({ admin, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    email: admin?.email || "",
    password: admin ? undefined : "", // Don't include password for editing
    invitationCode: admin ? undefined : "", // Don't include invitation code for editing
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For editing, only validate email
    const validationData = admin ? { email: formData.email } : formData;

    const validationErrors = validateAdmin(validationData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // For editing, only submit email
    const submitData = admin
      ? { email: formData.email }
      : {
          email: formData.email,
          password: formData.password,
          invitationCode: formData.invitationCode,
        };

    onSubmit(submitData);
  };

  return (
    <Card
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        borderRadius: "20px",
        border: "1px solid var(--gray-6)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Header */}
      <Flex
        justify="between"
        align="center"
        p="6"
        style={{
          background:
            "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Flex align="center" gap="3">
          <Flex
            align="center"
            justify="center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <UserIcon height="20" width="20" style={{ color: "white" }} />
          </Flex>
          <Heading size="6" style={{ color: "white" }}>
            {admin ? "Edit Administrator" : "Create Administrator"}
          </Heading>
        </Flex>
        <Button
          variant="ghost"
          size="2"
          onClick={onCancel}
          style={{ color: "white" }}
        >
          <XMarkIcon height="20" width="20" />
        </Button>
      </Flex>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="6" p="6">
          <Grid columns="1" gap="6">
            {/* Email Field */}
            <Flex direction="column" gap="3">
              <Flex align="center" gap="2">
                <AtSymbolIcon
                  height="16"
                  width="16"
                  style={{ color: "var(--blue-9)" }}
                />
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-12)" }}
                >
                  Email Address *
                </Text>
              </Flex>
              <TextField.Root
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange("email")}
                style={{
                  borderRadius: "8px",
                  border: errors.email
                    ? "1px solid var(--red-7)"
                    : "1px solid var(--gray-6)",
                }}
              />
              {errors.email && (
                <Text size="2" style={{ color: "var(--red-9)" }}>
                  {errors.email}
                </Text>
              )}
            </Flex>

            {/* Password Field - Only for new admins */}
            {!admin && (
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <LockClosedIcon
                    height="16"
                    width="16"
                    style={{ color: "var(--blue-9)" }}
                  />
                  <Text
                    size="3"
                    weight="medium"
                    style={{ color: "var(--gray-12)" }}
                  >
                    Password *
                  </Text>
                </Flex>
                <TextField.Root
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  style={{
                    borderRadius: "8px",
                    border: errors.password
                      ? "1px solid var(--red-7)"
                      : "1px solid var(--gray-6)",
                  }}
                />
                {errors.password && (
                  <Text size="2" style={{ color: "var(--red-9)" }}>
                    {errors.password}
                  </Text>
                )}
              </Flex>
            )}

            {/* Invitation Code Field - Only for new admins */}
            {!admin && (
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <KeyIcon
                    height="16"
                    width="16"
                    style={{ color: "var(--blue-9)" }}
                  />
                  <Text
                    size="3"
                    weight="medium"
                    style={{ color: "var(--gray-12)" }}
                  >
                    Invitation Code *
                  </Text>
                </Flex>
                <TextField.Root
                  placeholder="Enter invitation code"
                  value={formData.invitationCode}
                  onChange={handleChange("invitationCode")}
                  style={{
                    borderRadius: "8px",
                    border: errors.invitationCode
                      ? "1px solid var(--red-7)"
                      : "1px solid var(--gray-6)",
                  }}
                />
                {errors.invitationCode && (
                  <Text size="2" style={{ color: "var(--red-9)" }}>
                    {errors.invitationCode}
                  </Text>
                )}
              </Flex>
            )}
          </Grid>

          {/* Form Actions */}
          <Flex gap="3" justify="end" style={{ marginTop: "2rem" }}>
            <Button
              type="button"
              variant="soft"
              size="3"
              onClick={onCancel}
              disabled={isLoading}
              style={{
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              <XMarkIcon height="16" width="16" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="3"
              disabled={isLoading}
              style={{
                background:
                  "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
                borderRadius: "8px",
                fontWeight: "600",
              }}
            >
              {isLoading ? (
                <Flex align="center" gap="2">
                  <Flex
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {admin ? "Updating..." : "Creating..."}
                </Flex>
              ) : (
                <Flex align="center" gap="2">
                  <CheckIcon height="16" width="16" />
                  {admin ? "Update Administrator" : "Create Administrator"}
                </Flex>
              )}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default AdminForm;
