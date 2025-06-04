import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, X } from "lucide-react";
import { useNavigate } from "react-router";
import logo from "../../assets/LOGO/logo-removebg.png";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../AdminPanelSetup/components/ui/dropdown-menu.tsx";
import { Button } from "../../AdminPanelSetup/components/ui/button.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../AdminPanelSetup/components/ui/alert-dialog.tsx";

const Navbar = ({ onSearchChange }) => {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const authTokenChk = Cookies.get("authToken");

  let roleId;

  if (authTokenChk) {
    const decodedToken = jwtDecode(authTokenChk);
    console.log("decodedToken", decodedToken);
    roleId = decodedToken?.role_id;
    console.log("userRole", roleId);
  }
  console.log("authTokenChk", authTokenChk);
  console.log("roleId", roleId);
  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userRole");
    Cookies.remove("user_id");
    navigate("/auth/login");
  };
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black/50 bg-opacity-50 backdrop-blur-xl  text-white px-4 py-3 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-2">
            <img src={logo} alt="store" className="h- w-14 object-contain" />
            <span className="text-xl font-semibold tracking-wide hidden md:inline">
              Store
            </span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:ring-1 focus:ring-purple-500 focus:outline-none "
            />
                      
          </div>

          <div className="hidden md:block">
            {authTokenChk ? (
              <>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full cursor-pointer"
                    >
                      <User />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="flex min-w-[120px] flex-col items-center justify-center"
                    align="end"
                    forceMount
                  >
                    {authTokenChk && roleId == 1 && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin")}
                        className="w-full justify-center border-b text-center cursor-pointer"
                      >
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    {authTokenChk && roleId == 2 && (
                      <DropdownMenuItem
                        onClick={() => navigate("/store")}
                        className="w-full justify-center border-b text-center cursor-pointer"
                      >
                        store Panel
                      </DropdownMenuItem>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          className="w-full justify-center text-center cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                        >
                          Log out
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will log you out
                            of your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <Button
                            className="flex items-center gap-1 px-3 py-1.5 text-sm transition"
                            onClick={handleLogout}
                          >
                            Log out
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <button
                className="flex items-center gap-2 border border-white/20 text-white font-semibold px-4 py-2 rounded-md  bg-gradient-to-r hover:from-gray-500 cursor-pointer hover:to-gray-600 transition"
                onClick={() => navigate("/auth/login")}
              >
                <span className="text-sm md:text-lg">Login</span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 500 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                opacity: { duration: 0.4 },
                maxHeight: { duration: 0.4 },
              }}
              className="overflow-hidden md:hidden px-4 pt-4 pb-6 space-y-4  "
            >
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2b292c] focus:outline-none focus:ring-1"
                />
              </div>
              <div className="flex justify-end">
                {authTokenChk ? (
                  <>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <User />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="flex min-w-[120px] flex-col items-center justify-center"
                        align="end"
                        forceMount
                      >
                        {authTokenChk && roleId == 1 && (
                          <DropdownMenuItem
                            onClick={() => navigate("/admin")}
                            className="w-full justify-center border-b text-center cursor-pointer"
                          >
                            Admin Panel
                          </DropdownMenuItem>
                        )}
                        {authTokenChk && roleId == 2 && (
                          <DropdownMenuItem
                            onClick={() => navigate("/store")}
                            className="w-full justify-center border-b text-center cursor-pointer"
                          >
                            store Panel
                          </DropdownMenuItem>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="w-full justify-center text-center cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              Log out
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will log you
                                out of your account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <Button
                                className="flex items-center gap-1 px-3 py-1.5 text-sm transition"
                                onClick={handleLogout}
                              >
                                Log out
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <button
                    className=" border border-white/20 text-white font-semibold px-4 py-2 rounded-md bg-gradient-to-r hover:from-gray-500 cursor-pointer hover:to-gray-600 transition"
                    onClick={() => navigate("/auth/login")}
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
