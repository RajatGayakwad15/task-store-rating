import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSideBar/app-sidebar.jsx";
import { Separator } from "../components/ui/separator.tsx";
import { LogOut, Ticket, MoreVertical, Store } from "lucide-react";
import Cookies from "js-cookie";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar.tsx";
import URLBreadcrumb from "./AppHeader/URLBreadcrumb.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog.tsx";
import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, Settings, User2Icon, Contact2 } from "lucide-react";
import IconComponent from "../components/buttons/IconComponent.jsx";

export default function AdminLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const AdminInfo = {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: {
      key: "superadmin",
      name: "Stores",
    },
    avatar: "https://via.placeholder.com/150",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const mappedNavMain = [
    {
      id: 1,
      title: "Store Managemnet",
      url: "/admin",
      icon: Store,
    },
    // {
    //   id: 2,
    //   title: "Store Managemnet",
    //   url: "/admin/stores",
    //   icon: Store,
    // },

    {
      id: 3,
      title: "User Management",
      url: "/admin/users",
      icon: User2Icon,
    },
    // {
    //   id: 4,
    //   title: "Contact",
    //   url: "/admin/contact",
    //   icon: Contact2,
    // },
  ];
  const naviget = useNavigate()
  const handleLogout = ()=>{
       Cookies.remove('authToken') // Replace 'token' with your actual cookie name
     Cookies.remove('userRole')
     naviget("/auth/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar AdminInfo={AdminInfo} navMain={mappedNavMain} />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#101010] sticky top-0 w-full z-100 text-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <URLBreadcrumb AdminInfo={AdminInfo} adminPath={"/admin"} />
          </div>
          <div className=" md:flex flex-row px-6 hidden">
            <div className="whitespace-nowrap  mx-3 capitalize flex items-center">
              Hey, {AdminInfo?.name}!
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <IconComponent
                  icon={LogOut}
                  variant="theme"
                  size={18}
                  className="cursor-pointer"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-500">
                    Logout Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                      onClick={handleLogout}
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
