"use client";
import React, { useState } from "react";
import { Menu, X, Home, Users, Settings, Briefcase } from "lucide-react";
import Link from "next/link";

// Define the type for a navigation link item
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Profile", href: "/user" },
  { name: "Company", href: "/user/company" },
  { name: "Scale Readiness", href: "/user/scale-readiness" },
  { name: "Technology Assessment", href: "/user/tech-assessment" },
  { name: "BMC Diagnostics", href: "/user/bmc-diagnostics" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Branding Area */}
          <div className="shrink-0">
            <Link
              href="/user"
              className="text-white text-2xl font-bold flex items-center"
            >
              <Briefcase className="w-6 h-6 mr-2 text-indigo-400" />
              MEST BDT
            </Link>
          </div>

          {/* Desktop Navigation Links (Hidden on small screens) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button (Hidden on desktop) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Toggled based on 'isOpen' state) */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150"
              onClick={() => setIsOpen(false)} // Close menu when item is clicked
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
