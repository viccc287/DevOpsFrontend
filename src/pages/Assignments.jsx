import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { assignments } from "../lib/api";
import AssignmentForm from "../components/AssignmentForm";
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
  ClipboardDocumentListIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  TruckIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Assignments = () => {
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const response = await assignments.getAll();
      setAssignmentsList(response.data);
    } catch (error) {
      toast.error("Failed to load assignments");
      console.error("Error loading assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowForm(true);
  };

  const handleUnassignVehicle = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to unassign this vehicle?")) {
      return;
    }

    try {
      await assignments.unassignVehicle(vehicleId);
      toast.success("Vehicle unassigned successfully");
      loadAssignments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to unassign vehicle"
      );
    }
  };

  const handleUnassignDriver = async (driverId) => {
    if (!window.confirm("Are you sure you want to unassign this driver?")) {
      return;
    }

    try {
      await assignments.unassignDriver(driverId);
      toast.success("Driver unassigned successfully");
      loadAssignments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unassign driver");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      await assignments.create(formData);
      toast.success("Assignment created successfully");
      setShowForm(false);
      loadAssignments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create assignment"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Assignment
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <AssignmentForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={formLoading}
          />
        </div>
      </div>
    );
  }

  // Separate active and historical assignments
  const activeAssignments = assignmentsList.filter(
    (assignment) => !assignment.endDate
  );
  const historicalAssignments = assignmentsList.filter(
    (assignment) => assignment.endDate
  );

  return (
    <Flex direction="column" gap="8">
      {/* Header */}
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex align="center" gap="3">
            <ClipboardDocumentListIcon
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
              Assignments
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
            Create Assignment
          </Button>
        </Flex>

        {!loading && assignmentsList.length > 0 && (
          <Text size="3" color="gray">
            Managing {assignmentsList.length} assignment
            {assignmentsList.length !== 1 ? "s" : ""} (
            {activeAssignments.length} active, {historicalAssignments.length}{" "}
            completed)
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
            Loading assignments...
          </Text>
        </Flex>
      ) : assignmentsList.length === 0 ? (
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
              <ClipboardDocumentListIcon
                height="40"
                width="40"
                style={{ color: "var(--purple-9)" }}
              />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <Heading size="6" style={{ color: "var(--purple-12)" }}>
                No assignments found
              </Heading>
              <Text
                size="4"
                style={{ color: "var(--purple-11)", textAlign: "center" }}
              >
                Start by creating your first assignment to connect drivers with
                vehicles.
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
              Create Your First Assignment
            </Button>
          </Flex>
        </Card>
      ) : (
        <Flex direction="column" gap="6">
          {/* Active Assignments */}
          {activeAssignments.length > 0 && (
            <Card
              style={{
                padding: "0",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--gray-6)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Section Header */}
              <Flex
                align="center"
                gap="3"
                p="5"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                }}
              >
                <CheckCircleIcon
                  height="24"
                  width="24"
                  style={{ color: "white" }}
                />
                <Heading size="5" style={{ color: "white" }}>
                  Active Assignments
                </Heading>
                <Badge
                  variant="soft"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {activeAssignments.length}
                </Badge>
              </Flex>

              {/* List Content */}
              <Flex direction="column" style={{ background: "white" }}>
                {activeAssignments.map((assignment, index) => (
                  <Flex
                    key={assignment.id}
                    align="center"
                    justify="between"
                    p="4"
                    style={{
                      borderBottom:
                        index < activeAssignments.length - 1
                          ? "1px solid var(--gray-4)"
                          : "none",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--gray-2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Flex align="center" gap="4" style={{ flex: 1 }}>
                      <Avatar
                        size="3"
                        fallback={assignment.driverName.charAt(0).toUpperCase()}
                        style={{
                          background:
                            "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
                          color: "white",
                        }}
                      />

                      <Flex direction="column" gap="1" style={{ flex: 1 }}>
                        <Flex align="center" gap="3">
                          <Text
                            size="3"
                            weight="bold"
                            style={{ color: "var(--gray-12)" }}
                          >
                            {assignment.licensePlate}
                          </Text>
                          <Text size="2" style={{ color: "var(--gray-10)" }}>
                            ↔
                          </Text>
                          <Text
                            size="3"
                            weight="medium"
                            style={{ color: "var(--blue-11)" }}
                          >
                            {assignment.driverName}
                          </Text>
                        </Flex>

                        <Flex align="center" gap="2">
                          <CalendarIcon
                            height="14"
                            width="14"
                            style={{ color: "var(--gray-9)" }}
                          />
                          <Text size="2" color="gray">
                            Assigned:{" "}
                            {new Date(
                              assignment.assignmentDate
                            ).toLocaleDateString()}
                          </Text>
                        </Flex>
                      </Flex>

                      <Flex gap="2">
                        <Button
                          size="2"
                          variant="soft"
                          color="red"
                          style={{
                            borderRadius: "8px",
                            fontWeight: "500",
                          }}
                          onClick={() =>
                            handleUnassignVehicle(assignment.vehicleId)
                          }
                        >
                          <XCircleIcon height="14" width="14" />
                          Unassign Vehicle
                        </Button>
                        <Button
                          size="2"
                          variant="soft"
                          color="red"
                          style={{
                            borderRadius: "8px",
                            fontWeight: "500",
                          }}
                          onClick={() =>
                            handleUnassignDriver(assignment.driverId)
                          }
                        >
                          <XCircleIcon height="14" width="14" />
                          Unassign Driver
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Card>
          )}

          {/* Historical Assignments */}
          {historicalAssignments.length > 0 && (
            <Card
              style={{
                padding: "0",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--gray-6)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Section Header */}
              <Flex
                align="center"
                gap="3"
                p="5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gray-7) 0%, var(--gray-8) 100%)",
                  color: "white",
                }}
              >
                <ClockIcon height="24" width="24" style={{ color: "white" }} />
                <Heading size="5" style={{ color: "white" }}>
                  Assignment History
                </Heading>
                <Badge
                  variant="soft"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {historicalAssignments.length}
                </Badge>
              </Flex>

              {/* List Content */}
              <Flex direction="column" style={{ background: "white" }}>
                {historicalAssignments.map((assignment, index) => (
                  <Flex
                    key={assignment.id}
                    align="center"
                    justify="between"
                    p="4"
                    style={{
                      borderBottom:
                        index < historicalAssignments.length - 1
                          ? "1px solid var(--gray-4)"
                          : "none",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--gray-2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Flex align="center" gap="4" style={{ flex: 1 }}>
                      <Avatar
                        size="3"
                        fallback={assignment.driverName.charAt(0).toUpperCase()}
                        style={{
                          background: "var(--gray-6)",
                          color: "white",
                        }}
                      />

                      <Flex direction="column" gap="1" style={{ flex: 1 }}>
                        <Flex align="center" gap="3">
                          <Text
                            size="3"
                            weight="bold"
                            style={{ color: "var(--gray-12)" }}
                          >
                            {assignment.licensePlate}
                          </Text>
                          <Text size="2" style={{ color: "var(--gray-10)" }}>
                            ↔
                          </Text>
                          <Text
                            size="3"
                            weight="medium"
                            style={{ color: "var(--blue-11)" }}
                          >
                            {assignment.driverName}
                          </Text>
                        </Flex>

                        <Flex align="center" gap="2">
                          <CalendarIcon
                            height="14"
                            width="14"
                            style={{ color: "var(--gray-9)" }}
                          />
                          <Text size="2" color="gray">
                            {new Date(
                              assignment.assignmentDate
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(assignment.endDate).toLocaleDateString()}
                          </Text>
                        </Flex>
                      </Flex>

                      <Badge
                        variant="soft"
                        style={{
                          background: "var(--gray-3)",
                          color: "var(--gray-11)",
                          border: "1px solid var(--gray-6)",
                        }}
                      >
                        <Flex align="center" gap="1">
                          <CheckCircleIcon height="12" width="12" />
                          Completed
                        </Flex>
                      </Badge>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Card>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Assignments;
