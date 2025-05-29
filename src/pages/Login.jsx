import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Flex, Text, TextField, Button, Heading } from "@radix-ui/themes";
import {
  EnvelopeIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const success = await login(formData);
    if (success) {
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: "1rem",
        background:
          "linear-gradient(135deg, var(--blue-2) 0%, var(--purple-2) 100%)",
      }}
    >
      {/* Brand Header */}
      <Flex
        direction="column"
        align="center"
        gap="6"
        style={{ marginBottom: "2rem" }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <TruckIcon height="40" width="40" style={{ color: "white" }} />
        </Flex>
        <Flex direction="column" align="center" gap="2">
          <Heading
            size="8"
            style={{
              background:
                "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Fleet Manager
          </Heading>
          <Text size="4" color="gray" style={{ textAlign: "center" }}>
            Fleet Management System
          </Text>
        </Flex>
      </Flex>

      <Card
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "0",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid var(--gray-6)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Card Header */}
        <Flex
          direction="column"
          align="center"
          gap="3"
          p="6"
          style={{
            background:
              "linear-gradient(135deg, var(--blue-3) 0%, var(--purple-3) 100%)",
          }}
        >
          <Heading size="6" style={{ color: "var(--blue-12)" }}>
            Welcome Back
          </Heading>
          <Text
            size="3"
            style={{ color: "var(--blue-11)", textAlign: "center" }}
          >
            Sign in to access your admin dashboard
          </Text>
        </Flex>

        {/* Form Content */}
        <Flex direction="column" gap="6" p="6" style={{ background: "white" }}>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-12)" }}
                >
                  Email Address
                </Text>
                <TextField.Root
                  name="email"
                  type="email"
                  placeholder="admin@fleetmanager.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="3"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid var(--gray-6)",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <TextField.Slot>
                    <EnvelopeIcon height="18" width="18" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Flex direction="column" gap="2">
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-12)" }}
                >
                  Password
                </Text>
                <TextField.Root
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  size="3"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid var(--gray-6)",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <TextField.Slot>
                    <LockClosedIcon height="18" width="18" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Button
                type="submit"
                disabled={loading}
                size="3"
                style={{
                  marginTop: "1rem",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
                  fontWeight: "600",
                  padding: "16px",
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Flex>
          </form>

          <Text size="3" align="center" style={{ color: "var(--gray-11)" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--blue-9)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register here
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
