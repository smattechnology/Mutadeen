"use client";
import React, { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "গ্যালারি", href: "/gallery" },
    { name: "ব্লগ", href: "/blog" },
    { name: "কুইজ", href: "/quiz" },
    { name: "পিডিএফ", href: "/pdf" },
    { name: "ভিডিও", href: "/video" },
    { name: "ডোনেশন", href: "/donation" },
    { name: "স্বেচ্ছাসেবক রেজিস্ট্রেশন", href: "/volunteer-registration" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <header className="w-full bg-gray-100 border-b border-gray-200 relative z-50">
      {/* Top Header */}
      <div className="lg:max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Mutadeen
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-white rounded bg-brand">
            Login
          </button>
          <button className="px-4 py-2 text-white rounded bg-brand">
            Register
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block bg-gray-800">
        <ul className="lg:max-w-7xl mx-auto flex px-4 py-2 space-x-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-white hover:text-blue-400 px-2 py-1"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 🔥 Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 🔥 Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 w-full bg-gray-800 z-50 transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block text-white hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <button className="w-full px-4 py-2 text-white rounded bg-brand">
              Login
            </button>
            <button className="w-full px-4 py-2 text-white rounded bg-brand">
              Register
            </button>
          </div>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="w-full px-4 py-3 flex justify-center items-center bg-white">
        <div className="w-full md:max-w-3xl flex border border-gray-300 rounded-md">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here..."
            className="w-full px-3 py-2 outline-none rounded-l-md"
          />
          <button className="px-4 text-gray-600 hover:text-blue-500">
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
