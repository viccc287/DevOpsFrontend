import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  Button,
  Separator,
  IconButton,
  Avatar,
} from "@radix-ui/themes";
import {
  HomeIcon,
  TruckIcon,
  UserGroupIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { logout, admin } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Vehicles", href: "/vehicles", icon: TruckIcon },
    { name: "Drivers", href: "/drivers", icon: UserGroupIcon },
    { name: "Routes", href: "/routes", icon: MapIcon },
    {
      name: "Assignments",
      href: "/assignments",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Admins", href: "/admins", icon: UserIcon },
  ];

  const SidebarContent = () => (
    <Flex direction="column" style={{ height: "100%" }}>
      {/* Header */}
      <Flex
        justify="between"
        align="center"
        p="4"
        style={{
          background:
            "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
          color: "white",
        }}
      >
        <Text size="5" weight="bold" style={{ color: "white" }}>
          Fleet Manager
        </Text>
        <IconButton
          variant="ghost"
          size="2"
          onClick={() => setSidebarOpen(false)}
          style={{
            color: "white",
            display: "var(--mobile-only, none)",
          }}
        >
          <XMarkIcon height="20" width="20" />
        </IconButton>
      </Flex>

      {/* Navigation */}
      <Flex direction="column" gap="2" mt="4" style={{ flex: 1 }}>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              style={{ textDecoration: "none" }}
              onClick={() => setSidebarOpen(false)}
            >
              <Button
                variant={isActive ? "solid" : "ghost"}
                color={isActive ? "navy" : "gray"}
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  padding: `${isActive ? "24px 16px" : "12px 16px"}`,
                  borderRadius: "0",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                <Icon height="20" width="20" style={{ marginRight: "12px" }} />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </Flex>

      {/* User section */}
      <Flex
        direction="column"
        gap="3"
        p="4"
        style={{
          background: "var(--gray-3)",
          borderRadius: "16px 16px 0 0",
          margin: "0 8px 0 8px",
        }}
      >
        <Flex align="center" gap="3">
          <Avatar
            size="2"
            fallback={admin?.email?.charAt(0).toUpperCase() || "A"}
            style={{
              background:
                "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
              color: "white",
            }}
          />
          <Flex direction="column">
            <Text size="2" weight="medium">
              {admin?.email?.split("@")[0] || "Admin"}
            </Text>
            <Text size="1" color="gray">
              Administrator
            </Text>
          </Flex>
        </Flex>

        <Button
          variant="soft"
          color="red"
          onClick={logout}
          style={{
            justifyContent: "flex-start",
            borderRadius: "8px",
          }}
        >
          <ArrowRightOnRectangleIcon
            height="16"
            width="16"
            style={{ marginRight: "8px" }}
          />
          Logout
        </Button>
      </Flex>
    </Flex>
  );

  return (
    <Flex style={{ height: "100vh", position: "relative" }}>
      {/* Mobile header */}
      <Flex
        justify="between"
        align="center"
        p="4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--gray-6)",
          display: "var(--mobile-only, flex)",
        }}
      >
        <Text
          size="4"
          weight="bold"
          style={{
            background:
              "linear-gradient(135deg, var(--blue-9) 0%, var(--purple-9) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Fleet Manager
        </Text>
        <IconButton
          variant="ghost"
          size="3"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon height="24" width="24" />
        </IconButton>
      </Flex>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <Flex
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 60,
            display: "var(--mobile-only, none)",
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <Flex
        direction="column"
        style={{
          width: "280px",
          background: "white",
          borderRight: "1px solid var(--gray-6)",
          boxShadow: "var(--shadow-3)",
          display: "var(--desktop-only, flex)",
        }}
      >
        <SidebarContent />
      </Flex>

      {/* Mobile sidebar */}
      <Flex
        direction="column"
        style={{
          position: "fixed",
          left: sidebarOpen ? 0 : "-100%",
          top: 0,
          width: "280px",
          height: "100vh",
          background: "white",
          zIndex: 70,
          transition: "left 0.3s ease",
          boxShadow: "var(--shadow-6)",
          display: "var(--mobile-only, none)",
        }}
      >
        <SidebarContent />
      </Flex>

      {/* Main content */}
      <Flex
        direction="column"
        style={{
          flex: 1,
          paddingTop: "var(--mobile-header-height, 0)",
          background: "var(--gray-1)",
        }}
      >
        <Flex
          direction="column"
          p="6"
          style={{
            flex: 1,
            overflow: "auto",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Outlet />
        </Flex>
      </Flex>

      <style jsx>{`
        @media (max-width: 768px) {
          :root {
            --mobile-only: flex;
            --desktop-only: none;
            --mobile-header-height: 80px;
          }
        }
        @media (min-width: 769px) {
          :root {
            --mobile-only: none;
            --desktop-only: flex;
            --mobile-header-height: 0;
          }
        }
      `}</style>
    </Flex>
  );
};

export default Layout;
