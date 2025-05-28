import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Button, Grid, Badge, Avatar } from "@radix-ui/themes";
import { 
  PlusIcon, 
  UserGroupIcon, 
  PencilIcon, 
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { drivers } from "../lib/api";
import toast from "react-hot-toast";

const Drivers = () => {
  const [driverList, setDriverList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await drivers.getAll();
      setDriverList(response.data);
    } catch (error) {
      toast.error("Failed to fetch drivers");
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
            <UserGroupIcon height="32" width="32" style={{ color: "var(--orange-9)" }} />
            <Heading 
              size="8"
              style={{
                background: "linear-gradient(135deg, var(--orange-9) 0%, var(--red-9) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Drivers
            </Heading>
          </Flex>
          <Button
            size="3"
            style={{
              background: "linear-gradient(135deg, var(--orange-9) 0%, var(--red-9) 100%)",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            <PlusIcon height="18" width="18" />
            Add Driver
          </Button>
        </Flex>
        
        {!loading && driverList.length > 0 && (
          <Text size="3" color="gray">
            Managing {driverList.length} driver{driverList.length !== 1 ? 's' : ''} in your fleet
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
              borderTop: "3px solid var(--orange-9)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <Text size="3" color="gray">Loading drivers...</Text>
        </Flex>
      ) : driverList.length === 0 ? (
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
              background: "linear-gradient(135deg, var(--orange-3) 0%, var(--red-3) 100%)",
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
              <UserGroupIcon height="40" width="40" style={{ color: "var(--orange-9)" }} />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <Heading size="6" style={{ color: "var(--orange-12)" }}>
                No drivers found
              </Heading>
              <Text size="4" style={{ color: "var(--orange-11)", textAlign: "center" }}>
                Start building your team by adding your first driver to the system.
              </Text>
            </Flex>
            <Button
              size="3"
              style={{
                background: "linear-gradient(135deg, var(--orange-9) 0%, var(--red-9) 100%)",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              <PlusIcon height="18" width="18" />
              Add Your First Driver
            </Button>
          </Flex>
        </Card>
      ) : (
        <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
          {driverList.map((driver) => (
            <Card
              key={driver.id}
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
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              {/* Card Header */}
              <Flex
                justify="between"
                align="center"
                p="4"
                style={{
                  background: driver.isAssigned 
                    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                }}
              >
                <Flex align="center" gap="3">
                  <Avatar
                    size="2"
                    fallback={driver.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <Flex direction="column">
                    <Text size="3" weight="bold" style={{ color: "white" }}>
                      {driver.fullName.split(' ')[0]}
                    </Text>
                    <Text size="1" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      License: {driver.licenseNumber}
                    </Text>
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
                  {driver.isAssigned ? (
                    <Flex align="center" gap="1">
                      <ClockIcon height="12" width="12" />
                      Assigned
                    </Flex>
                  ) : (
                    <Flex align="center" gap="1">
                      <CheckCircleIcon height="12" width="12" />
                      Available
                    </Flex>
                  )}
                </Badge>
              </Flex>

              {/* Card Content */}
              <Flex direction="column" gap="4" p="5" style={{ background: "white" }}>
                <Flex direction="column" gap="3">
                  <Heading size="5" style={{ color: "var(--gray-12)" }}>
                    {driver.fullName}
                  </Heading>
                  
                  <Flex direction="column" gap="3">
                    <Flex align="center" gap="3" p="3" style={{ 
                      background: "var(--gray-2)", 
                      borderRadius: "8px",
                      border: "1px solid var(--gray-4)",
                    }}>
                      <IdentificationIcon height="16" width="16" style={{ color: "var(--gray-9)" }} />
                      <Flex direction="column" style={{ flex: 1 }}>
                        <Text size="1" color="gray" weight="medium">CURP</Text>
                        <Text size="2" weight="medium" style={{ fontFamily: "monospace" }}>
                          {driver.curp}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex align="center" gap="3" p="3" style={{ 
                      background: "var(--green-2)", 
                      borderRadius: "8px",
                      border: "1px solid var(--green-4)",
                    }}>
                      <CurrencyDollarIcon height="16" width="16" style={{ color: "var(--green-9)" }} />
                      <Flex direction="column" style={{ flex: 1 }}>
                        <Text size="1" color="gray" weight="medium">Monthly Salary</Text>
                        <Text size="3" weight="bold" style={{ color: "var(--green-11)" }}>
                          ${driver.monthlySalary.toLocaleString()}
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

export default Drivers;
