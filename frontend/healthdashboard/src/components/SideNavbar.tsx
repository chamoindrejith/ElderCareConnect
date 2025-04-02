"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import {
  Home,
  MessageCircleMore,
  UserRound,
  ChevronRight,
  BellRing,
  ChartLine,
  TriangleAlert,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { getCookie } from "cookies-next"; // Import getCookie from cookies-next

type Props = Record<string, never>; // Define Props as an explicitly empty object

export default function SideNavbar({}: Props) {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // State to store user role
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    const role = getCookie("userRole") as string | null; // Get user role from cookies
    setUserRole(role);
  }, []);

  function toggleSidebar() {
    setisCollapsed(!isCollapsed);
  }

  const commonLinks = [
    {
      title: "Home",
      href: "/",
      icon: Home,
      variant: "default" as "default", // Explicitly type as "default"
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageCircleMore,
      variant: "ghost" as "ghost", // Explicitly type as "ghost"
    },
    {
      title: "Reminders",
      href: "/reminders",
      icon: BellRing,
      variant: "ghost" as "ghost",
    },
    {
      title: "Health Status",
      href: "/status",
      icon: ChartLine,
      variant: "ghost" as "ghost",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: UserRound,
      variant: "ghost" as "ghost",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: ChevronRight,
      variant: "ghost" as "ghost",
    },
  ];

  const caregiverLinks = [
    ...commonLinks,
    {
      title: "Alert",
      href: "/alerts",
      icon: TriangleAlert,
      variant: "ghost" as "ghost",
    },
    {
      title: "Add Elder",
      href: "/addelder",
      icon: UserRoundPlus,
      variant: "ghost" as "ghost",
    },
  ];

  const elderLinks = [...commonLinks]; // Elders only see common links

  const links = userRole === "caregiver" ? caregiverLinks : elderLinks;

  return (
    <>
      <div className="relative min-w-{80px} border-r px-3 pb-10 pt-24">
        {!mobileWidth && (
          <div className="absolute right-5 top-6">
            <Button
              variant="secondary"
              className="rounded-full p-2"
              onClick={toggleSidebar}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
        <Nav isCollapsed={mobileWidth || isCollapsed} links={links} />
      </div>
    </>
  );
}
