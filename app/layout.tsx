'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDesktopDropdown = () => {
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSubmenuOpen(false);
  };

  const toggleMobileSubmenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsMobileSubmenuOpen(!isMobileSubmenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsMobileSubmenuOpen(false);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <header className="bg-gradient-to-r from-white to-blue-500 text-blue-950 shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold flex items-center">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={150}
                    height={40}
                    alt="ShipTrack Logo"
                    className="max-h-10 w-auto cursor-pointer"
                  />
                </Link>
              </div>
              <div className="hidden md:flex space-x-6 text-lg">
                <Link href="/" className="text-black hover:text-blue-200 transition duration-300">Home</Link>
                <Link href="/contact" className="text-blacl hover:text-blue-200 transition duration-300">Contact</Link>
                <div className="relative inline-block text-left" ref={dropdownRef}>
                  <button
                    onClick={toggleDesktopDropdown}
                    className="text-black hover:text-blue-200 transition duration-300 flex items-center"
                  >
                    Services <ChevronDown className="ml-1" size={20} />
                  </button>
                  {isDesktopDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link href="/shipment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black-900">Shipment</Link>
                        <Link href="/tracking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black-900">Tracking</Link>
                        <Link href="/details" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black-900">Details</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-white">
                  <Menu size={24} />
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="mt-4 md:hidden">
                <button onClick={() => handleNavigation('/')} className="block w-full text-left py-2 text-black hover:text-blue-200 transition duration-300">Home</button>
                <button onClick={() => handleNavigation('/contact')} className="block w-full text-left py-2 text-black hover:text-blue-200 transition duration-300">Contact</button>
                <button
                  onClick={toggleMobileSubmenu}
                  className="w-full text-left py-2 text-black hover:text-blue-200 transition duration-300 flex items-center justify-between"
                >
                  Services <ChevronDown size={20} className={`transform transition-transform duration-200 ${isMobileSubmenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileSubmenuOpen && (
                  <div className="pl-4">
                    <button onClick={() => handleNavigation('/shipment')} className="block w-full text-left py-2 text-sm text-black hover:text-blue-200">Shipment</button>
                    <button onClick={() => handleNavigation('/tracking')} className="block w-full text-left py-2 text-sm text-black hover:text-blue-200">Tracking</button>
                    <button onClick={() => handleNavigation('/details')} className="block w-full text-left py-2 text-sm text-black hover:text-blue-200">Details</button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-navy-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/2 lg:w-1/3 text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-xl font-bold">Tianyi Decoration Construction</h2>
                <p className="mt-2 text-sm text-gray-300">Advanced Shipping Management Solutions</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 text-center md:text-right">
                <p className="text-sm">&copy; 2024 Tianyi Decoration Construction. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}