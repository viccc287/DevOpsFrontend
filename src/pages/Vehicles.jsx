import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Button, Table } from "@radix-ui/themes";
import { PlusIcon, TruckIcon } from "@heroicons/react/24/outline";
import { vehicles } from "../lib/api";
import toast from "react-hot-toast";

const Vehicles = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicles.getAll();
      setVehicleList(response.data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="6">Vehicles</Heading>
        <Button>
          <PlusIcon height="16" width="16" />
          Add Vehicle
        </Button>
      </Flex>

      <Card>
        {loading ? (
          <Flex justify="center" align="center" style={{ padding: "2rem" }}>
            <Text>Loading vehicles...</Text>
          </Flex>
        ) : vehicleList.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ padding: "3rem" }}
          >
            <TruckIcon
              height="48"
              width="48"
              style={{ color: "var(--gray-8)" }}
            />
            <Text size="4" weight="medium">
              No vehicles found
            </Text>
            <Text color="gray">
              Start by adding your first vehicle to the fleet.
            </Text>
            <Button>
              <PlusIcon height="16" width="16" />
              Add Vehicle
            </Button>
          </Flex>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>License Plate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>VIN</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {vehicleList.map((vehicle) => (
                <Table.Row key={vehicle.id}>
                  <Table.Cell>{vehicle.brand}</Table.Cell>
                  <Table.Cell>{vehicle.model}</Table.Cell>
                  <Table.Cell>{vehicle.licensePlate}</Table.Cell>
                  <Table.Cell>{vehicle.vin}</Table.Cell>
                  <Table.Cell>
                    <Text color={vehicle.isAssigned ? "orange" : "green"}>
                      {vehicle.isAssigned ? "Assigned" : "Available"}
                    </Text>
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

export default Vehicles;
