import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  CircleDashed,
  Handshake,
  Inbox,
  LayoutDashboard,
  PhoneCall,
  Plane,
  User2,
} from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const overview = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
];
const activity = [
  {
    title: "All Bookings",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "Pending Bookings",
    url: "#",
    icon: CircleDashed,
  },
  {
    title: "Completed Bookings",
    url: "#",
    icon: CircleCheckBig,
  },
];
const others = [
  {
    title: "Contact",
    url: "#",
    icon: PhoneCall,
  },
  {
    title: "Terms and conditions",
    url: "#",
    icon: Handshake,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <span>DYCARGO</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overview.map((items) => (
                <SidebarMenuItem key={items.title}>
                  <SidebarMenuButton asChild>
                    <Link href={items.url}>
                      <items.icon />
                      <span>{items.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Activity</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activity.map((items) => (
                <SidebarMenuItem key={items.title}>
                  <SidebarMenuButton asChild>
                    <Link href={items.url}>
                      <items.icon />
                      <span>{items.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* COLLAPSABLE */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Others
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {others.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto">
        <Link
          href="/profile"
          className="
            flex items-center gap-3 px-3 py-2
            transition-all duration-200
            group-data-[state=collapsed]:justify-center
            group-data-[state=collapsed]:px-0
          "
        >
          <span
            className="
              flex items-center justify-center
              rounded-full
              bg-linear-to-br from-amber-400 to-orange-600
              text-white
              shadow-sm shadow-orange-500/30
              ring-1 ring-white/20
              transition-all duration-200
              p-3
              group-data-[state=collapsed]:p-1
            "
          >
            <User2
              className="
                w-6 h-6 transition-all duration-200
                group-data-[state=collapsed]:w-5
                group-data-[state=collapsed]:h-5
              "
            />
          </span>

          <span
            className="
              text-xl font-medium truncate
              transition-all duration-200
              group-data-[state=collapsed]:hidden
            "
          >
            John Doe
          </span>
        </Link>
      </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
