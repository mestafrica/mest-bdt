"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Group, User } from "lucide-react";
import Link from "next/link";
import HankoLogout from "../auth/HankoLogout";
import NoSSR from "../core/NoSSR";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Programs", icon: Group, href: "/programs" },
  { name: "Profile", icon: User, href: "/profile" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white bg-indigo-600 rounded-md lg:hidden shadow-lg hover:bg-indigo-700 transition"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-auto lg:shadow-xl
          flex-shrink-0 ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div>
            <div className="mb-8 flex items-center justify-between lg:justify-start">
              <h1 className="text-2xl font-bold text-indigo-400">
                MEST Africa - BDT
              </h1>
              <button
                className="p-1 rounded lg:hidden text-gray-400 hover:text-white"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-2 grow">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition duration-150 ease-in-out ${
                      isActive
                        ? "bg-indigo-500 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <NoSSR>
            <HankoLogout />
          </NoSSR>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
