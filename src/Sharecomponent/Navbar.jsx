import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo3 from "../assets/3.png";
import useContexHooks from "../useHooks/useContexHooks";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user, logOut, togol, setTogol } = useContexHooks();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeChange = (e) => {
    const isChecked = e.target.checked;
    localStorage.setItem("EduHubTheme", isChecked);
    setTogol(isChecked);
  };

  // NavLink component with consistent styling
  const CustomNavLink = ({ to, children }) => (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `
        px-4 py-2 rounded-lg transition-all duration-200 font-medium
        ${
          isActive
            ? "text-white bg-gradient-to-r from-[#F66B1D] to-[#F99D1C] shadow-md"
            : "text-gray-200 hover:text-white hover:bg-gray-700"
        }
      `}
    >
      {children}
    </NavLink>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isSticky ? "bg-gray-900/95 shadow-lg backdrop-blur-sm" : "bg-gray-900"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
            
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <img 
                src={logo3} 
                alt="EduHub Logo" 
                className="h-8 hidden md:block transition-transform group-hover:scale-105" 
              />
              <span className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                EduHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <CustomNavLink to="/">Home</CustomNavLink>
            <CustomNavLink to="/allclasses">All Classes</CustomNavLink>
            <CustomNavLink to="/techon">Teach on EduHub</CustomNavLink>
          </nav>

          {/* User controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden cursor-pointer flex items-center justify-center border-2 border-transparent group-hover:border-yellow-300 transition-colors">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserAlt className="text-gray-300 text-lg" />
                  )}
                </div>

                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-xl hidden group-hover:block p-4 border border-gray-700">
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-800 transform rotate-45 border-t border-l border-gray-700"></div>
                  <h3 className="text-lg font-bold text-white mb-3 truncate">
                    {user.displayName?.split(" ").slice(0, 2).join(" ") || "User"}
                  </h3>
                  <div className="space-y-2">
                    <NavLink
                      to="/dashboard/profile"
                      className="block w-full text-center py-2 bg-gradient-to-r from-[#F66B1D] to-[#F99D1C] text-white rounded-md hover:opacity-90 transition-opacity"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logOut}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/signIn"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Sign in 
                </Link>
              {/*  <Link
                  to="/register"
                  className="hidden md:block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>  Mobile Register button */}
              </div>
            )}

            {/* Theme toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={togol}
                onChange={handleThemeChange}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F66B1D]">
                <span className="absolute left-1 top-0.5 text-[10px] text-yellow-300 peer-checked:hidden">☀️</span>
                <span className="absolute right-1 top-0.5 text-[10px] text-white hidden peer-checked:inline">🌙</span>
              </div>
            </label>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 rounded-lg mt-2 p-4 shadow-lg border border-gray-700">
            <nav className="flex flex-col gap-2">
              <CustomNavLink to="/">Home</CustomNavLink>
              <CustomNavLink to="/allclasses">All Classes</CustomNavLink>
              <CustomNavLink to="/techon">Teach on EduHub</CustomNavLink>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;