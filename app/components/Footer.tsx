"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PawPrint, Instagram, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Whiskers",
      icon: Instagram,
      href: "https://instagram.com/whiskers"
    },
    { name: "Luna", icon: Instagram, href: "https://instagram.com/luna" },
    { name: "Shadow", icon: Instagram, href: "https://instagram.com/shadow" }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Family Tree", href: "/cats" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="bg-[#F5F1EA] border-t border-[#8B9A8B]/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo & Description */}
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#D4766A]"
                >
                  <PawPrint size={32} fill="currentColor" />
                </motion.div>
                <span className="text-2xl font-bold text-[#D4766A] font-display">
                  Feline Squad
                </span>
              </div>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Follow our adorable cat family&apos;s daily adventures, mischief,
              and endless cuddles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#D4766A] mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-700 hover:text-[#8B6F47] transition-colors inline-block"
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold text-[#D4766A] mb-4 font-display">
              Follow Our Cats
            </h3>
            <div className="space-y-3">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#8B6F47] transition-colors"
                  >
                    <social.icon size={20} />
                    <span>{social.name}&apos;s Instagram</span>
                  </motion.div>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Get Daily Cuteness
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-full border-2 border-[#8B9A8B]/30 focus:border-[#D4766A] focus:outline-none text-sm"
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#D4766A] text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-[#C86A5D] hover:shadow-lg transition-all"
                  aria-label="Subscribe to newsletter"
                >
                  <Mail size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#8B9A8B]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Feline Squad. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart size={16} className="text-[#D4766A] fill-current" />
            </motion.div>
            <span>for our furry friends</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
