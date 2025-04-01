"use client";

import React, { useState } from "react";
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

type Props = unknown;

export default function SideNavbar({}: Props) {
  const [isCollapsed, setisCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setisCollapsed(!isCollapsed);
  }

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
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Home",
              href: "/",
              icon: Home,
              variant: "default",
            },
            {
              title: "Chat",
              href: "/chat",
              icon: MessageCircleMore,
              variant: "ghost",
            },
            {
              title: "Reminders",
              href: "/reminders",
              icon: BellRing,
              variant: "ghost",
            },
            {
              title: "Health Status",
              href: "/status",
              icon: ChartLine,
              variant: "ghost",
            },
            {
              title: "Profile",
              href: "/profile",
              icon: UserRound,
              variant: "ghost",
            },
            {
              title: "Alert",
              href: "/alerts",
              icon: TriangleAlert,
              variant: "ghost",
            },
            {
              title: "Add Elder",
              href: "/addelder",
              icon: UserRoundPlus,
              variant: "ghost",
            },
          ]}
        />
      </div>
    </>
  );
}
