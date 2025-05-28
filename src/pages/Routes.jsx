import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { routes } from "../lib/api";
import RouteForm from "../components/RouteForm";
import MiniMap from "../components/MiniMap";
import { calculateDistance, formatDistance } from "../lib/distance";
import {
  Flex,
  Text,
  Card,
  Heading,
  Button,
  Grid,
  Badge,
  Avatar,
} from "@radix-ui/themes";
import {
  PlusIcon,
  MapIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  TruckIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const RoutesPage = () => {
  const [routeList, setRouteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await routes.getAll();
      setRouteList(response.data);
    } catch (error) {
      toast.error("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRoute(null);
    setShowForm(true);
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route?")) {
      return;
    }

    try {
      await routes.delete(id);
      toast.success("Route deleted successfully");
      fetchRoutes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete route");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (editingRoute) {
        await routes.update(editingRoute.id, formData);
        toast.success("Route updated successfully");
      } else {
        await routes.create(formData);
        toast.success("Route created successfully");
      }

      setShowForm(false);
      setEditingRoute(null);
      fetchRoutes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save route");
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingRoute(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {editingRoute ? "Edit Route" : "Create Route"}
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <RouteForm
            route={editingRoute}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={formLoading}
            isUpdate={!!editingRoute}
          />
        </div>
      </div>
    );
  }

  return (
    <Flex direction="column" gap="8">
      {/* Header */}
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex align="center" gap="3">
            <MapIcon
              height="32"
              width="32"
              style={{ color: "var(--purple-9)" }}
            />
            <Heading
              size="8"
              style={{
                background:
                  "linear-gradient(135deg, var(--purple-9) 0%, var(--blue-9) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Routes
            </Heading>
          </Flex>
          <Button
            size="3"
            style={{
              background:
                "linear-gradient(135deg, var(--purple-9) 0%, var(--blue-9) 100%)",
              borderRadius: "12px",
              fontWeight: "600",
            }}
            onClick={handleCreate}
          >
            <PlusIcon height="18" width="18" />
            Add Route
          </Button>
        </Flex>

        {!loading && routeList.length > 0 && (
          <Text size="3" color="gray">
            Managing {routeList.length} route{routeList.length !== 1 ? "s" : ""}{" "}
            in your system
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
              borderTop: "3px solid var(--purple-9)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <Text size="3" color="gray">
            Loading routes...
          </Text>
        </Flex>
      ) : routeList.length === 0 ? (
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
                "linear-gradient(135deg, var(--purple-3) 0%, var(--blue-3) 100%)",
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
              <MapIcon
                height="40"
                width="40"
                style={{ color: "var(--purple-9)" }}
              />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <Heading size="6" style={{ color: "var(--purple-12)" }}>
                No routes found
              </Heading>
              <Text
                size="4"
                style={{ color: "var(--purple-11)", textAlign: "center" }}
              >
                Start by creating your first route to manage vehicle
                assignments.
              </Text>
            </Flex>
            <Button
              size="3"
              style={{
                background:
                  "linear-gradient(135deg, var(--purple-9) 0%, var(--blue-9) 100%)",
                borderRadius: "12px",
                fontWeight: "600",
              }}
              onClick={handleCreate}
            >
              <PlusIcon height="18" width="18" />
              Create Your First Route
            </Button>
          </Flex>
        </Card>
      ) : (
        <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
          {routeList.map((route) => {
            const distance =
              route.startLat && route.startLng && route.endLat && route.endLng
                ? calculateDistance(
                    parseFloat(route.startLat),
                    parseFloat(route.startLng),
                    parseFloat(route.endLat),
                    parseFloat(route.endLng)
                  )
                : null;

            return (
              <Card
                key={route.id}
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
                    background: route.successful
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(217, 119, 6) 100%)",
                    color: "white",
                  }}
                >
                  <Flex align="center" gap="3">
                    <Avatar
                      size="2"
                      fallback={route.name.charAt(0).toUpperCase()}
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    />
                    <Flex direction="column">
                      <Text size="3" weight="bold" style={{ color: "white" }}>
                        {route.name}
                      </Text>
                      <Flex align="center" gap="2">
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
                            {new Date(
                              route.routeDate + "T00:00:00"
                            ).toLocaleDateString()}
                          </Text>
                        </Flex>
                        {distance && (
                          <>
                            <Text style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                              •
                            </Text>
                            <Text
                              size="1"
                              style={{ color: "rgba(255, 255, 255, 0.8)" }}
                            >
                              {formatDistance(distance)}
                            </Text>
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Badge
                    variant="soft"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {route.successful ? (
                      <Flex align="center" gap="1">
                        <CheckCircleIcon height="12" width="12" />
                        Success
                      </Flex>
                    ) : (
                      <Flex align="center" gap="1">
                        <ClockIcon height="12" width="12" />
                        Pending
                      </Flex>
                    )}
                  </Badge>
                </Flex>

                {/* Card Content */}
                <Flex
                  direction="column"
                  gap="4"
                  p="5"
                  style={{ background: "white" }}
                >
                  {/* Mini Map */}
                  {route.startLat &&
                    route.startLng &&
                    route.endLat &&
                    route.endLng && (
                     
                       
                        <MiniMap
                          startLat={route.startLat}
                          startLng={route.startLng}
                          endLat={route.endLat}
                          endLng={route.endLng}
                      height="150px"
                        />
                    )}

                  <Flex direction="column" gap="3">
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
                        <UserIcon
                          height="16"
                          width="16"
                          style={{ color: "var(--blue-9)" }}
                        />
                        <Flex direction="column" style={{ flex: 1 }}>
                          <Text size="1" color="gray" weight="medium">
                            Driver
                          </Text>
                          <Text
                            size="2"
                            weight="medium"
                            style={{ color: "var(--blue-11)" }}
                          >
                            {route.driverName}
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
                        <TruckIcon
                          height="16"
                          width="16"
                          style={{ color: "var(--green-9)" }}
                        />
                        <Flex direction="column" style={{ flex: 1 }}>
                          <Text size="1" color="gray" weight="medium">
                            Vehicle
                          </Text>
                          <Text
                            size="2"
                            weight="medium"
                            style={{ color: "var(--green-11)" }}
                          >
                            {route.licensePlate}
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
                      onClick={() => handleEdit(route)}
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
                      onClick={() => handleDelete(route.id)}
                    >
                      <TrashIcon height="14" width="14" />
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Grid>
      )}
    </Flex>
  );
};

export default RoutesPage;
