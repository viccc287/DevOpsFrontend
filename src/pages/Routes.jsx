import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Card,
  Heading,
  Button,
  Table,
  Badge,
} from "@radix-ui/themes";
import { PlusIcon, MapIcon } from "@heroicons/react/24/outline";
import { routes } from "../lib/api";
import toast from "react-hot-toast";

const RoutesPage = () => {
  const [routeList, setRouteList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await routes.getAll();
      setRouteList(response.data);
    } catch (error) {
      toast.error("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="6">Routes</Heading>
        <Button>
          <PlusIcon height="16" width="16" />
          Add Route
        </Button>
      </Flex>

      <Card>
        {loading ? (
          <Flex justify="center" align="center" style={{ padding: "2rem" }}>
            <Text>Loading routes...</Text>
          </Flex>
        ) : routeList.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ padding: "3rem" }}
          >
            <MapIcon
              height="48"
              width="48"
              style={{ color: "var(--gray-8)" }}
            />
            <Text size="4" weight="medium">
              No routes found
            </Text>
            <Text color="gray">Start by creating your first route.</Text>
            <Button>
              <PlusIcon height="16" width="16" />
              Add Route
            </Button>
          </Flex>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Driver</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {routeList.map((route) => (
                <Table.Row key={route.id}>
                  <Table.Cell>{route.name}</Table.Cell>
                  <Table.Cell>
                    {new Date(route.routeDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{route.driverName}</Table.Cell>
                  <Table.Cell>{route.licensePlate}</Table.Cell>
                  <Table.Cell>
                    <Badge color={route.successful ? "green" : "red"}>
                      {route.successful ? "Successful" : "Failed"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button size="1" variant="soft">
                        Edit
                      </Button>
                      <Button size="1" variant="soft" color="red">
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card>
    </Flex>
  );
};

export default RoutesPage;
