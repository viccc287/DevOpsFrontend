import { useState, useEffect } from "react";
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
} from "@heroicons/react/24/outline";
import { assignments } from "../lib/api";
import toast from "react-hot-toast";

const Assignments = () => {
  const [assignmentList, setAssignmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await assignments.getAll();
      setAssignmentList(response.data);
    } catch (error) {
      toast.error("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="8">
      {/* Header */}
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex align="center" gap="3">
            <ClipboardDocumentListIcon
              height="32"
              width="32"
              style={{ color: "var(--indigo-9)" }}
            />
            <Heading
              size="8"
              style={{
                background:
                  "linear-gradient(135deg, var(--indigo-9) 0%, var(--purple-9) 100%)",
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
                "linear-gradient(135deg, var(--indigo-9) 0%, var(--purple-9) 100%)",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            <PlusIcon height="18" width="18" />
            Create Assignment
          </Button>
        </Flex>

        {!loading && assignmentList.length > 0 && (
          <Text size="3" color="gray">
            Managing {assignmentList.length} assignment
            {assignmentList.length !== 1 ? "s" : ""} in your fleet
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
              borderTop: "3px solid var(--indigo-9)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <Text size="3" color="gray">
            Loading assignments...
          </Text>
        </Flex>
      ) : assignmentList.length === 0 ? (
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
                "linear-gradient(135deg, var(--indigo-3) 0%, var(--purple-3) 100%)",
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
                style={{ color: "var(--indigo-9)" }}
              />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <Heading size="6" style={{ color: "var(--indigo-12)" }}>
                No assignments found
              </Heading>
              <Text
                size="4"
                style={{ color: "var(--indigo-11)", textAlign: "center" }}
              >
                Start by creating your first vehicle-driver assignment to manage
                your fleet operations.
              </Text>
            </Flex>
            <Button
              size="3"
              style={{
                background:
                  "linear-gradient(135deg, var(--indigo-9) 0%, var(--purple-9) 100%)",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              <PlusIcon height="18" width="18" />
              Create Your First Assignment
            </Button>
          </Flex>
        </Card>
      ) : (
        <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
          {assignmentList.map((assignment) => (
            <Card
              key={assignment.id}
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
                  background: assignment.endDate
                    ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                }}
              >
                <Flex align="center" gap="3">
                  <Avatar
                    size="2"
                    fallback={assignment.driverName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <Flex direction="column">
                    <Text size="3" weight="bold" style={{ color: "white" }}>
                      {assignment.driverName.split(" ")[0]}
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
                        {new Date(
                          assignment.assignmentDate
                        ).toLocaleDateString()}
                      </Text>
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
                  {assignment.endDate ? (
                    <Flex align="center" gap="1">
                      <XCircleIcon height="12" width="12" />
                      Ended
                    </Flex>
                  ) : (
                    <Flex align="center" gap="1">
                      <CheckCircleIcon height="12" width="12" />
                      Active
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
                          {assignment.driverName}
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
                          {assignment.licensePlate}
                        </Text>
                      </Flex>
                    </Flex>

                    {assignment.endDate && (
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
                            End Date
                          </Text>
                          <Text
                            size="2"
                            weight="medium"
                            style={{ color: "var(--gray-11)" }}
                          >
                            {new Date(assignment.endDate).toLocaleDateString()}
                          </Text>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                </Flex>

                <Flex gap="2" style={{ marginTop: "auto" }}>
                  {!assignment.endDate && (
                    <Button
                      variant="soft"
                      color="orange"
                      style={{
                        flex: 1,
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    >
                      End Assignment
                    </Button>
                  )}
                  <Button
                    variant="soft"
                    color="red"
                    style={{
                      flex: assignment.endDate ? 1 : 0.5,
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
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

export default Assignments;
