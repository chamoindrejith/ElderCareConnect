"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  House,
  UserRound,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {};

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
            icon: House,
            variant: "default",
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "ghost",
          },
          {
            title: "Profile",
            href: "/profile",
            icon: UserRound,
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
    </>
  );
}
