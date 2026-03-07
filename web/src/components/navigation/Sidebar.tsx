"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutGrid,
  Cpu,
  Users,
  Terminal,
  Activity,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import HankoLogout from "../auth/HankoLogout";
import NoSSR from "../core/NoSSR";
import { ThemeToggle } from "../core/ThemeToggle";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutGrid, href: "/" },
  { name: "Programs", icon: Cpu, href: "/programs" },
  { name: "Profiles", icon: Users, href: "/profiles" },
  { name: "Forms", icon: Terminal, href: "/forms" },
  { name: "Responses", icon: Activity, href: "/responses" },
  { name: "Account", icon: Settings2, href: "/account" },
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
        className="fixed top-4 left-4 z-50 p-2 text-white bg-primary rounded-lg lg:hidden shadow-lg hover:opacity-90 transition"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-card text-foreground z-40 border-r border-border
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-screen lg:shadow-none
          flex-shrink-0 ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  MEST BDT
                </h1>
              </Link>
              <button
                className="p-1 rounded lg:hidden text-foreground/50 hover:text-foreground"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-1.5">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon
                      size={20}
                      className={isActive ? "text-white" : "text-primary"}
                    />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                Theme
              </span>
              <ThemeToggle />
            </div>
            <NoSSR>
              <HankoLogout />
            </NoSSR>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
