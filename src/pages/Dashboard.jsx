import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Grid, Button } from "@radix-ui/themes";
import {
  UserIcon,
  TruckIcon,
  UserGroupIcon,
  MapIcon,
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
    },
    {
      title: "Total Vehicles",
      value: stats.totalVehicles,
      icon: TruckIcon,
      color: "green",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers,
      icon: UserGroupIcon,
      color: "orange",
    },
    {
      title: "Today's Routes",
      value: stats.todayRoutes,
      icon: MapIcon,
      color: "purple",
    },
  ];

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: "200px" }}>
        <Text>Loading dashboard...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="6">
      <Heading size="6">Dashboard</Heading>

      <Grid columns="4" gap="4" width="auto">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} style={{ padding: "1.5rem" }}>
              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Icon
                    height="24"
                    width="24"
                    style={{ color: `var(--${metric.color}-9)` }}
                  />
                  <Text
                    size="6"
                    weight="bold"
                    style={{ color: `var(--${metric.color}-9)` }}
                  >
                    {metric.value}
                  </Text>
                </Flex>
                <Text size="2" color="gray">
                  {metric.title}
                </Text>
              </Flex>
            </Card>
          );
        })}
      </Grid>

      <Card style={{ padding: "2rem" }}>
        <Flex direction="column" gap="4">
          <Heading size="4">Welcome to Fleet Manager</Heading>
          <Text color="gray">
            Monitor and manage your fleet operations from this dashboard. Use
            the navigation menu to access different sections of the application.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Dashboard;
