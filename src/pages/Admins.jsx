import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Card,
  Heading,
  Button,
  Grid,
  Avatar,
} from "@radix-ui/themes";
import {
  PlusIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  AtSymbolIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { admins } from "../lib/api";
import AdminForm from "../components/AdminForm";
import toast from "react-hot-toast";

const Admins = () => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await admins.getAll();
      setAdminList(response.data);
    } catch (error) {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    setShowForm(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this administrator?")
    ) {
      return;
    }

    try {
      await admins.delete(id);
      toast.success("Administrator deleted successfully");
      fetchAdmins();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete administrator"
      );
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (editingAdmin) {
        await admins.update(editingAdmin.id, formData);
        toast.success("Administrator updated successfully");
      } else {
        await admins.register(formData);
        toast.success("Administrator created successfully");
      }

      setShowForm(false);
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save administrator"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAdmin(null);
  };

  if (showForm) {
    return (
      <Flex direction="column" gap="6">
        <Flex align="center" gap="3">
          <UserIcon height="24" width="24" style={{ color: "var(--blue-9)" }} />
          <Heading size="6">
            {editingAdmin ? "Edit Administrator" : "Create Administrator"}
          </Heading>
        </Flex>

        <AdminForm
          admin={editingAdmin}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={formLoading}
        />
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="8">
      {/* Header */}
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex align="center" gap="3">
            <UserIcon
              height="32"
              width="32"
              style={{ color: "var(--blue-9)" }}
            />
            <Heading
              size="8"
              style={{
                background:
                  "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Administrators
            </Heading>
          </Flex>
          <Button
            size="3"
            style={{
              background:
                "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
              borderRadius: "12px",
              fontWeight: "600",
            }}
            onClick={handleCreate}
          >
            <PlusIcon height="18" width="18" />
            Add Admin
          </Button>
        </Flex>

        {!loading && adminList.length > 0 && (
          <Text size="3" color="gray">
            Managing {adminList.length} administrator
            {adminList.length !== 1 ? "s" : ""} in your system
          </Text>
        )}
      </Flex>

      {/* Content */}
      {loading ? (
        <Flex
          justify="center"
          align="center"
          direction="column"
          gap="4"
          style={{ padding: "4rem" }}
        >
          <Flex
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--gray-6)",
              borderTop: "3px solid var(--blue-9)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <Text size="3" color="gray">
            Loading administrators...
          </Text>
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Flex>
      ) : adminList.length === 0 ? (
        <Card
          style={{
            padding: "0",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--gray-6)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Flex
            direction="column"
            align="center"
            gap="6"
            style={{
              background:
                "linear-gradient(135deg, var(--blue-3) 0%, var(--indigo-3) 100%)",
              padding: "4rem 2rem",
            }}
          >
            <Flex
              align="center"
              justify="center"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <UserIcon
                height="40"
                width="40"
                style={{ color: "var(--blue-9)" }}
              />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <Heading size="6" style={{ color: "var(--blue-12)" }}>
                No administrators found
              </Heading>
              <Text
                size="4"
                style={{ color: "var(--blue-11)", textAlign: "center" }}
              >
                Invite new administrators to help manage the fleet system.
              </Text>
            </Flex>
            <Button
              size="3"
              style={{
                background:
                  "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
                borderRadius: "12px",
                fontWeight: "600",
              }}
              onClick={handleCreate}
            >
              <PlusIcon height="18" width="18" />
              Invite Administrator
            </Button>
          </Flex>
        </Card>
      ) : (
        <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
          {adminList.map((admin) => (
            <Card
              key={admin.id}
              style={{
                padding: "0",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--gray-6)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              {/* Card Header */}
              <Flex
                justify="between"
                align="center"
                p="4"
                style={{
                  background:
                    "linear-gradient(135deg, var(--blue-9) 0%, var(--indigo-9) 100%)",
                  color: "white",
                }}
              >
                <Flex align="center" gap="3">
                  <Avatar
                    size="2"
                    fallback={admin.email.split("@")[0].charAt(0).toUpperCase()}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <Flex direction="column">
                    <Text size="3" weight="bold" style={{ color: "white" }}>
                      {admin.email.split("@")[0]}
                    </Text>
                    <Flex align="center" gap="1">
                      <CalendarIcon
                        height="12"
                        width="12"
                        style={{ color: "rgba(255, 255, 255, 0.8)" }}
                      />
                      <Text
                        size="1"
                        style={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <ShieldCheckIcon
                    height="16"
                    width="16"
                    style={{ color: "white" }}
                  />
                </Flex>
              </Flex>

              {/* Card Content */}
              <Flex
                direction="column"
                gap="4"
                p="5"
                style={{ background: "white" }}
              >
                <Flex direction="column" gap="3">
                  <Heading size="5" style={{ color: "var(--gray-12)" }}>
                    Administrator
                  </Heading>

                  <Flex direction="column" gap="3">
                    <Flex
                      align="center"
                      gap="3"
                      p="3"
                      style={{
                        background: "var(--blue-2)",
                        borderRadius: "8px",
                        border: "1px solid var(--blue-4)",
                      }}
                    >
                      <AtSymbolIcon
                        height="16"
                        width="16"
                        style={{ color: "var(--blue-9)" }}
                      />
                      <Flex direction="column" style={{ flex: 1 }}>
                        <Text size="1" color="gray" weight="medium">
                          Email Address
                        </Text>
                        <Text
                          size="2"
                          weight="medium"
                          style={{ color: "var(--blue-11)" }}
                        >
                          {admin.email}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      align="center"
                      gap="3"
                      p="3"
                      style={{
                        background: "var(--gray-2)",
                        borderRadius: "8px",
                        border: "1px solid var(--gray-4)",
                      }}
                    >
                      <CalendarIcon
                        height="16"
                        width="16"
                        style={{ color: "var(--gray-9)" }}
                      />
                      <Flex direction="column" style={{ flex: 1 }}>
                        <Text size="1" color="gray" weight="medium">
                          Member Since
                        </Text>
                        <Text
                          size="2"
                          weight="medium"
                          style={{ color: "var(--gray-11)" }}
                        >
                          {new Date(admin.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      align="center"
                      gap="3"
                      p="3"
                      style={{
                        background: "var(--green-2)",
                        borderRadius: "8px",
                        border: "1px solid var(--green-4)",
                      }}
                    >
                      <ShieldCheckIcon
                        height="16"
                        width="16"
                        style={{ color: "var(--green-9)" }}
                      />
                      <Flex direction="column" style={{ flex: 1 }}>
                        <Text size="1" color="gray" weight="medium">
                          Role
                        </Text>
                        <Text
                          size="2"
                          weight="medium"
                          style={{ color: "var(--green-11)" }}
                        >
                          System Administrator
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex gap="2" style={{ marginTop: "auto" }}>
                  <Button
                    variant="soft"
                    style={{
                      flex: 1,
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                    onClick={() => handleEdit(admin)}
                  >
                    <PencilIcon height="14" width="14" />
                    Edit
                  </Button>
                  <Button
                    variant="soft"
                    color="red"
                    style={{
                      flex: 1,
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                    onClick={() => handleDelete(admin.id)}
                  >
                    <TrashIcon height="14" width="14" />
                    Delete
                  </Button>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default Admins;
