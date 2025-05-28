import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Button, Table } from "@radix-ui/themes";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
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
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="6">Drivers</Heading>
        <Button>
          <PlusIcon height="16" width="16" />
          Add Driver
        </Button>
      </Flex>

      <Card>
        {loading ? (
          <Flex justify="center" align="center" style={{ padding: "2rem" }}>
            <Text>Loading drivers...</Text>
          </Flex>
        ) : driverList.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ padding: "3rem" }}
          >
            <UserGroupIcon
              height="48"
              width="48"
              style={{ color: "var(--gray-8)" }}
            />
            <Text size="4" weight="medium">
              No drivers found
            </Text>
            <Text color="gray">
              Start by adding your first driver to the system.
            </Text>
            <Button>
              <PlusIcon height="16" width="16" />
              Add Driver
            </Button>
          </Flex>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Full Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>License Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>CURP</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Monthly Salary</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {driverList.map((driver) => (
                <Table.Row key={driver.id}>
                  <Table.Cell>{driver.fullName}</Table.Cell>
                  <Table.Cell>{driver.licenseNumber}</Table.Cell>
                  <Table.Cell>{driver.curp}</Table.Cell>
                  <Table.Cell>
                    ${driver.monthlySalary.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Text color={driver.isAssigned ? "orange" : "green"}>
                      {driver.isAssigned ? "Assigned" : "Available"}
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

export default Drivers;
