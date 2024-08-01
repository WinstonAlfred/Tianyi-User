import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShipTrack - Advanced Shipping Management",
  description: "Streamline your shipping operations with ShipTrack's advanced tracking and management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <nav className="bg-gradient-to-r from-white to-blue-500 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
            <Image
                src="/logo.png"  
                alt="ShipTrack Logo"
                width={150}  // Adjust based on your logo's dimensions
                height={40}  // Adjust based on your logo's dimensions
                className="max-h-10 w-auto"  // Ensures the logo fits within the navbar
              />
            </Link>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-white hover:text-blue-200 transition duration-300">Home</Link></li>
              <li><Link href="/about" className="text-white hover:text-blue-200 transition duration-300">About</Link></li>
              <li><Link href="/contact" className="text-white hover:text-blue-200 transition duration-300">Contact</Link></li>
            </ul>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-navy-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-xl font-bold">Tianyi Decoration Construction</h2>
                <p className="mt-2 text-sm text-gray-300">Advanced Shipping Management Solutions</p>
              </div>
              <div className="w-full md:w-1/3 text-center md:text-right">
                <p>&copy; 2024 Tianyi Decoration Construction. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}