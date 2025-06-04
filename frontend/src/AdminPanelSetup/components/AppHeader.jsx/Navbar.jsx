import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = useCallback(({ isActive }) => {
    let base =
      "px-3 py-2 text-base font-medium transition-colors duration-300 ";
    return (
      base +
      (isActive
        ? "text-white border-b-2 border-blue-400"
        : "text-gray-200 hover:text-white")
    );
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#0F172A]/95 shadow-md " : "bg-transparent "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          JoinTheWaitlist
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 mx-8 flex-grow justify-center relative text-lg font-semibold">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/subscribe" className={navLinkClass}>
            <div className="relative">
              <button
                onClick={() => setProductOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-2 text-lg font-semibold text-gray-200 hover:text-white"
              >
                Subscribe
              </button>
            </div>
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-200 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Right Section - Desktop */}

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/contact"
            className="px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:opacity-90 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop on the left */}
          <div className="w-1/5 bg-black/50" onClick={toggleMenu}></div>

          {/* Slide-in drawer on the right */}
          <div className="w-4/5 bg-[#0F172A] shadow-lg animate-slide-in-right h-full overflow-y-auto">
            <div className="px-4 py-6 space-y-4 divide-y divide-white/10">
              <NavLink
                to="/"
                className="block px-3 py-2 text-gray-200 hover:text-white"
                onClick={toggleMenu}
              >
                Home
              </NavLink>

              <div className="px-3 py-2">
                <button
                  onClick={() => setProductOpen(!productOpen)}
                  className="flex items-center justify-between w-full text-gray-200 hover:text-white"
                >
                  <span>Subscribe</span>
                </button>
              </div>

              <NavLink
                to="/contact"
                className="block px-3 py-2 text-gray-200 hover:text-white"
                onClick={toggleMenu}
              >
                Contact
              </NavLink>

              <div className="pt-4">
                <button className="w-full px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:opacity-90 transition duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
