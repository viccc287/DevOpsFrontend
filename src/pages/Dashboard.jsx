import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Grid, Badge } from "@radix-ui/themes";
import {
  UserIcon,
  TruckIcon,
  UserGroupIcon,
  MapIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { dashboard } from "../lib/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalVehicles: 0,
    totalDrivers: 0,
    todayRoutes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await dashboard.getStats();
      setStats(data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: UserIcon,
      color: "blue",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    },
    {
      title: "Total Vehicles",
      value: stats.totalVehicles,
      icon: TruckIcon,
      color: "green",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers,
      icon: UserGroupIcon,
      color: "orange",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      title: "Today's Routes",
      value: stats.todayRoutes,
      icon: MapIcon,
      color: "purple",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    },
  ];

  if (loading) {
    return (
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap="4"
        style={{ height: "200px" }}
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
          Loading dashboard...
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
    );
  }

  return (
    <Flex direction="column" gap="8">
      {/* Header */}
      <Flex direction="column" gap="3">
        <Flex align="center" gap="3">
          <ChartBarIcon
            height="32"
            width="32"
            style={{ color: "var(--blue-9)" }}
          />
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
            Dashboard
          </Heading>
        </Flex>
        <Flex align="center" gap="2">
          <ClockIcon
            height="16"
            width="16"
            style={{ color: "var(--gray-9)" }}
          />
          <Text size="3" color="gray">
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </Flex>
      </Flex>

      {/* Metrics Grid */}
      <Grid columns={{ initial: "1", sm: "2", lg: "4" }} gap="6" width="auto">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.title}
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
              {/* Gradient header */}
              <Flex
                justify="between"
                align="center"
                p="4"
                style={{
                  background: metric.gradient,
                  color: "white",
                }}
              >
                <Icon height="28" width="28" style={{ color: "white" }} />
               
              </Flex>

              {/* Content */}
              <Flex
                direction="column"
                gap="3"
                p="4"
                style={{ background: "white" }}
              >
                <Text
                  size="7"
                  weight="bold"
                  style={{
                    color: "var(--gray-12)",
                    lineHeight: "1",
                  }}
                >
                  {metric.value.toLocaleString()}
                </Text>
                <Text size="3" color="gray" weight="medium">
                  {metric.title}
                </Text>
              </Flex>
            </Card>
          );
        })}
      </Grid>

      {/* Welcome Section */}
      <Flex gap="6">
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
            style={{
              background:
                "linear-gradient(135deg, var(--blue-3) 0%, var(--purple-3) 100%)",
              padding: "2rem",
            }}
          >
            <Heading
              size="6"
              style={{
                color: "var(--blue-12)",
                marginBottom: "1rem",
              }}
            >
              Welcome to Fleet Manager
            </Heading>
            <Text
              size="4"
              style={{
                color: "var(--blue-11)",
                lineHeight: "1.6",
              }}
            >
              Monitor and manage your fleet operations from this comprehensive
              dashboard. Use the navigation menu to access different sections of
              the application.
            </Text>
          </Flex>
        </Card>

   
      </Flex>
    </Flex>
  );
};

export default Dashboard;
