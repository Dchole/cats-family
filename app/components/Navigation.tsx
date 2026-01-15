"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(254, 248, 243, 0)", "rgba(254, 248, 243, 0.95)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 140, 66, 0)", "rgba(255, 140, 66, 0.2)"]
  );

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // If not on home page, navigate to home page with hash
    if (pathname !== "/") {
      window.location.href = "/#about";
      return;
    }

    // If on home page, smooth scroll to section
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // If not on home page, navigate to home page with hash
    if (pathname !== "/") {
      window.location.href = "/#contact";
      return;
    }

    // If on home page, smooth scroll to section
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about", onClick: handleAboutClick },
    { name: "Family Tree", href: "/cats" },
    { name: "Contact", href: "/#contact", onClick: handleContactClick }
  ];

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          borderBottomColor: borderColor
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Go to homepage - Feline Squad">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
              >
                <motion.div
                  animate={
                    logoHovered
                      ? { rotate: [-15, 15, -15, 15, 0] }
                      : { rotate: [0, 10, -10, 0] }
                  }
                  transition={{
                    duration: logoHovered ? 0.5 : 3,
                    repeat: logoHovered ? 0 : Infinity,
                    repeatDelay: logoHovered ? 0 : 2
                  }}
                  className="text-[#D4766A]"
                >
                  <PawPrint size={32} fill="currentColor" />
                </motion.div>
                <span className="text-2xl font-bold text-[#D4766A] font-display">
                  Feline Squad
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={link.onClick}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-medium cursor-pointer relative px-4 py-2 group"
                    >
                      {/* Orange pill background for active page */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[#D4766A] rounded-full"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 group-hover:text-[#D4766A]"
                        }`}
                      >
                        {link.name}
                      </span>

                      {/* Thin bottom border on hover (not for active) */}
                      {!isActive && (
                        <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B6F47] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onKeyDown={e => {
                if (e.key === "Escape" && mobileMenuOpen) {
                  setMobileMenuOpen(false);
                }
              }}
              className="md:hidden text-gray-700 hover:text-[#D4766A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4766A] focus:ring-offset-2 rounded-lg p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        className="fixed top-18 left-0 right-0 bg-[#FAF8F5]/95 backdrop-blur-sm overflow-hidden z-40 md:hidden border-b border-[#8B9A8B]/30"
        role="menu"
        aria-hidden={!mobileMenuOpen}
        style={{ visibility: mobileMenuOpen ? "visible" : "hidden" }}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={e => {
                  if (link.onClick) link.onClick(e);
                  setMobileMenuOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
                role="menuitem"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="block text-lg font-medium text-gray-700 hover:text-[#D4766A] transition-colors py-2"
                >
                  {link.name}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
