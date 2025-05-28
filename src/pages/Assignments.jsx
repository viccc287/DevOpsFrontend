import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Button, Table } from "@radix-ui/themes";
import {
  PlusIcon,
  ClipboardDocumentListIcon,
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
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="6">Assignments</Heading>
        <Button>
          <PlusIcon height="16" width="16" />
          Create Assignment
        </Button>
      </Flex>

      <Card>
        {loading ? (
          <Flex justify="center" align="center" style={{ padding: "2rem" }}>
            <Text>Loading assignments...</Text>
          </Flex>
        ) : assignmentList.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ padding: "3rem" }}
          >
            <ClipboardDocumentListIcon
              height="48"
              width="48"
              style={{ color: "var(--gray-8)" }}
            />
            <Text size="4" weight="medium">
              No assignments found
            </Text>
            <Text color="gray">
              Start by creating your first vehicle-driver assignment.
            </Text>
            <Button>
              <PlusIcon height="16" width="16" />
              Create Assignment
            </Button>
          </Flex>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Driver</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Assignment Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {assignmentList.map((assignment) => (
                <Table.Row key={assignment.id}>
                  <Table.Cell>{assignment.driverName}</Table.Cell>
                  <Table.Cell>{assignment.licensePlate}</Table.Cell>
                  <Table.Cell>
                    {new Date(assignment.assignmentDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {assignment.endDate
                      ? new Date(assignment.endDate).toLocaleDateString()
                      : "Active"}
                  </Table.Cell>
                  <Table.Cell>
                    <Text color={assignment.endDate ? "gray" : "green"}>
                      {assignment.endDate ? "Ended" : "Active"}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      {!assignment.endDate && (
                        <Button size="1" variant="soft" color="orange">
                          End Assignment
                        </Button>
                      )}
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

export default Assignments;
