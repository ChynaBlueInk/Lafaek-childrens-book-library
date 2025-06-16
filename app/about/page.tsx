"use client";

import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4] text-black">
      {/* Header */}
      <header className="w-full bg-[#2a513e]">
        <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64">
          <Image
            src="/images/lafaekbanner.png"
            alt="Lafaek Banner"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Mission Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 max-w-md w-full mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative h-28 w-28">
              <Image
                src="/images/lafaek-logo.png"
                alt="Lafaek Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#2a513e] mb-4 text-center">
            Our Mission
          </h2>

          <p className="text-gray-600 mb-4 text-sm">
            Lafaek Learning Media is dedicated to making reading fun and accessible for children of all ages.
            Our app provides a safe, engaging environment where kids can explore stories, learn new things, and
            develop a lifelong love of reading.
          </p>

          <p className="text-gray-600 mb-4 text-sm">
            With colorful illustrations, interactive elements, and a growing library of books, we aim to inspire imagination and creativity in young minds.
          </p>

          <p className="text-gray-600 text-sm">
            Parents can feel confident knowing that all content is age-appropriate and educational, while kids will love the fun, easy-to-use interface designed just for them.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 max-w-md w-full mb-8">
          <h2 className="text-xl font-bold text-[#2a513e] mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Have questions, suggestions, or feedback? We'd love to hear from you! Our team is dedicated to improving Lafaek Learning Media and making it the best reading app for children.
          </p>

          <Link href="mailto:lafaek@careint.org" passHref>
            <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Version 1.0.0</p>
          <p>© 2025 Lafaek Learning Media. All rights reserved.</p>
        </div>
      </main>

      {/* Footer Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t border-gray-300 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3 text-gray-700 text-sm">
            <Link href="/" className="flex flex-col items-center hover:text-black">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/library" className="flex flex-col items-center hover:text-black">
              <Book className="h-5 w-5" />
              Library
            </Link>
            <Link href="/downloads" className="flex flex-col items-center hover:text-black">
              <Download className="h-5 w-5" />
              Downloads
            </Link>
            <Link href="/about" className="flex flex-col items-center text-[#2a513e] font-semibold">
              <Info className="h-5 w-5" />
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
