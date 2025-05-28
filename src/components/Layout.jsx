import { Outlet, Link, useLocation } from "react-router-dom";
import { Flex, Text, Button, Separator } from "@radix-ui/themes";
import { useState } from "react";
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

  return (
    <Flex className="h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Flex
        direction="column"
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <Flex className="h-16 items-center justify-between px-6 border-b border-gray-200">
          <Text className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fleet Manager
          </Text>
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </Flex>

        {/* Navigation */}
        <Flex direction="column" className="flex-1 py-6">
          <nav className="space-y-2 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="block"
                >
                  <Button
                    variant={isActive ? "solid" : "ghost"}
                    className={`
                      w-full justify-start px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </Flex>

        {/* User section */}
        <Flex direction="column" className="border-t border-gray-200 p-6 bg-gray-50">
          <Flex direction="column" className="space-y-3">
            <Flex direction="column" className="space-y-1">
              <Text className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logged in as
              </Text>
              <Text className="text-sm font-semibold text-gray-900 truncate">
                {admin?.email}
              </Text>
            </Flex>
            <Button
              variant="soft"
              color="red"
              onClick={logout}
              className="justify-start px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
              <span className="font-medium">Logout</span>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex direction="column" className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <Flex className="h-16 bg-white border-b border-gray-200 px-4 items-center lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </Button>
          <Text className="ml-4 text-lg font-semibold text-gray-900">
            Fleet Manager
          </Text>
        </Flex>

        {/* Content area */}
        <Flex className="flex-1 overflow-auto bg-gray-50">
          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
