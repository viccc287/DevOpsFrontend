import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Flex, Text, TextField, Button, Heading } from "@radix-ui/themes";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
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
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      <Card style={{ maxWidth: "400px", width: "100%", padding: "2rem" }}>
        <Flex direction="column" gap="4">
          <Flex direction="column" align="center" gap="2">
            <Heading size="6">Admin Login</Heading>
            <Text color="gray" size="2">
              Sign in to your account
            </Text>
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <Flex direction="column" gap="1">
                <Text size="2" weight="medium">
                  Email
                </Text>
                <TextField.Root
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                >
                  <TextField.Slot>
                    <EnvelopeIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Flex direction="column" gap="1">
                <Text size="2" weight="medium">
                  Password
                </Text>
                <TextField.Root
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                >
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Button
                type="submit"
                disabled={loading}
                style={{ marginTop: "1rem" }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Flex>
          </form>

          <Text size="2" align="center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--accent-9)" }}>
              Register here
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
