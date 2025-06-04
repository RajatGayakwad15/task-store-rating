import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible.tsx";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../components/ui/sidebar.tsx";
import { Skeleton } from "../../components/ui/skeleton.tsx";

export function NavMain({ items, allMenuPending }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (allMenuPending) {
    // Show skeleton while loading
    return (
      <SidebarGroup>
        <SidebarMenu>
          {[...Array(10)].map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton className="py-5 cursor-pointer">
                <Skeleton className="h-6 w-full" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isDashboard = item.url === "/admin";
          const isActive = isDashboard
            ? location.pathname === item.url
            : location.pathname.startsWith(item.url);

          return item.items && item.items.length > 1 ? (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`py-5 cursor-pointer ${
                      isActive ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"
                    }`}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = location.pathname.startsWith(
                        subItem.url
                      );
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <div
                              className={`cursor-pointer px-4 py-4 rounded-md ${
                                isSubActive
                                  ? "bg-zinc-800 text-white"
                                  : "hover:bg-zinc-800"
                              }`}
                              onClick={() => navigate(subItem.url)}
                            >
                              <p>{subItem.title}</p>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuButton
              className={`py-5 cursor-pointer ${
                isActive ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"
              }`}
              tooltip={item.title}
              onClick={() => navigate(item.url)}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
