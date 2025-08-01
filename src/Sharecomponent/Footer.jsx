import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  // Reusable NavLink component for consistent styling
  const FooterNavLink = ({ to, children, icon }) => (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `
        flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? "text-white bg-gradient-to-r from-[#F66B1D] to-[#F99D1C]"
            : "text-gray-300 hover:text-white hover:bg-gray-700"
        }
      `}
    >
      {icon && <span className="text-yellow-400">{icon}</span>}
      {children}
    </NavLink>
  );

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="py-12 border-b border-gray-800">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and About Section */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                <span className="text-[#F66B1D]">Edu</span>
                <span className="text-yellow-400">Hub</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Empowering learners with knowledge and skills through a modern,
                intuitive platform for smart education.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <FooterNavLink to="/">Home</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink to="/allclasses">All Classes</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink to="/techon">Teach on EduHub</FooterNavLink>
                </li>
               {/*  <li>
                  <FooterNavLink to="/contact" icon={<FaEnvelope />}>
                    Contact
                  </FooterNavLink>
                </li>
                */}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaPhone className="text-yellow-400 text-lg" />
                  <span>+123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-yellow-400 text-lg" />
                  <a 
                    href="mailto:EduHub@gmail.com" 
                    className="hover:text-yellow-400 transition-colors"
                  >
                    EduHub@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#F66B1D] text-yellow-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#F66B1D] text-yellow-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#F66B1D] text-yellow-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#F66B1D] text-yellow-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright Section */}
      <div className="py-6 bg-gray-900/95">
        <Container>
          <div className="text-center text-gray-400">
            <p>
              Copyright © {new Date().getFullYear()} - All rights reserved by
              <span className="text-yellow-400 ml-1">EduHub</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;