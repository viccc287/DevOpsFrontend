import { useState, useEffect } from "react";
import { Flex, Text, Card, Heading, Button, Table } from "@radix-ui/themes";
import { PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { admins } from "../lib/api";
import toast from "react-hot-toast";

const Admins = () => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await admins.getAll();
      setAdminList(response.data);
    } catch (error) {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="6">Admins</Heading>
        <Button>
          <PlusIcon height="16" width="16" />
          Add Admin
        </Button>
      </Flex>

      <Card>
        {loading ? (
          <Flex justify="center" align="center" style={{ padding: "2rem" }}>
            <Text>Loading admins...</Text>
          </Flex>
        ) : adminList.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ padding: "3rem" }}
          >
            <UserIcon
              height="48"
              width="48"
              style={{ color: "var(--gray-8)" }}
            />
            <Text size="4" weight="medium">
              No admins found
            </Text>
            <Text color="gray">
              Invite new administrators to manage the system.
            </Text>
            <Button>
              <PlusIcon height="16" width="16" />
              Add Admin
            </Button>
          </Flex>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {adminList.map((admin) => (
                <Table.Row key={admin.id}>
                  <Table.Cell>{admin.email}</Table.Cell>
                  <Table.Cell>
                    {new Date(admin.createdAt).toLocaleDateString()}
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

export default Admins;
