import * as React from "react";
import { NavMain } from "./nav-main.jsx";
import { NavUser } from "./nav-user.jsx";
// import avatarIMg from "../../assets/logo.svg";
// import LargeLogo from "../../assets/logo.svg";
// import smallLogo from "../../assets/logo.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../components/ui/sidebar.tsx";

export function AppSidebar({ AdminInfo, navMain, allMenuPending, ...props }) {
  const data = {
    user: {
      name: AdminInfo?.role?.name,
      email: AdminInfo?.email,
      // avatar: avatarIMg,
      // largeLogo: LargeLogo,
      // smallLogo: smallLogo,
      username: AdminInfo?.username,
    },
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#111]">
        <NavUser user={data?.user} />
      </SidebarHeader>
      <SidebarContent className="bg-[#101010]">
        <NavMain items={navMain} allMenuPending={allMenuPending} />
      </SidebarContent>
    </Sidebar>
  );
}
