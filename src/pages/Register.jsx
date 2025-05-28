import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Flex, Text, TextField, Button, Heading } from "@radix-ui/themes";
import {
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    invitationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    const success = await register(formData);
    if (success) {
      navigate("/login");
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
            <Heading size="6">Admin Registration</Heading>
            <Text color="gray" size="2">
              Create your admin account
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

              <Flex direction="column" gap="1">
                <Text size="2" weight="medium">
                  Invitation Code
                </Text>
                <TextField.Root
                  name="invitationCode"
                  type="text"
                  placeholder="Enter invitation code"
                  value={formData.invitationCode}
                  onChange={handleChange}
                  required
                >
                  <TextField.Slot>
                    <KeyIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Button
                type="submit"
                disabled={loading}
                style={{ marginTop: "1rem" }}
              >
                {loading ? "Creating account..." : "Register"}
              </Button>
            </Flex>
          </form>

          <Text size="2" align="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent-9)" }}>
              Sign in here
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Register;
