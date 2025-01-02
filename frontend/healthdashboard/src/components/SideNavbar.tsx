"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";
import {
  Home,
  LayoutDashboard,
  BellRing,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setisCollapsed] = useState(false);
  
  function toggleSidebar() {
    setisCollapsed(!isCollapsed);
  }
  
  return (
    <div className="relative min-w-{80px} border-r px-3 pb-10 pt-24">
      <div className="absolute right-5 top-6">
        <Button
          variant="secondary"
          className="rounded-full p-2"
          onClick={() => setisCollapsed(!isCollapsed)}
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Home",
            href: "/",
            icon: Home,
            variant: "default",
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "ghost",
          },
          {
            title: "Alerts",
            href: "/alerts",
            icon: BellRing,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
