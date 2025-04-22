"use client";

import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-green-700 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto flex items-center justify-center">
          <div className="relative h-16 w-16 mr-2">
            <Image
              src="/images/lafaek-logo.png"
              alt="Lafaek Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-white drop-shadow-md">
            About Lafaek
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Mission Section */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 max-w-md mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative h-32 w-32">
              <Image
                src="/images/lafaek-logo.png"
                alt="Lafaek Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-green-400 mb-4 text-center">
            Our Mission
          </h2>

          <p className="text-gray-300 mb-4">
            Lafaek Learning Media is dedicated to making reading fun and
            accessible for children of all ages. Our app provides a safe,
            engaging environment where kids can explore stories, learn new
            things, and develop a lifelong love of reading.
          </p>

          <p className="text-gray-300 mb-4">
            With colorful illustrations, interactive elements, and a growing
            library of books, we aim to inspire imagination and creativity in
            young minds.
          </p>

          <p className="text-gray-300">
            Parents can feel confident knowing that all content is
            age-appropriate and educational, while kids will love the fun,
            easy-to-use interface designed just for them.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 max-w-md mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from
            you! Our team is dedicated to improving Lafaek Learning Media and
            making it the best reading app for children.
          </p>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Mail className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Version 1.0.0</p>
          <p>© 2025 Lafaek Learning Media. All rights reserved.</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-gray-900 border-t border-gray-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3 text-gray-400 text-sm">
            <Link href="/" className="flex flex-col items-center hover:text-white">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/library" className="flex flex-col items-center hover:text-white">
              <Book className="h-5 w-5" />
              Library
            </Link>
            <Link href="/downloads" className="flex flex-col items-center hover:text-white">
              <Download className="h-5 w-5" />
              Downloads
            </Link>
            <Link href="/about" className="flex flex-col items-center text-green-400">
              <Info className="h-5 w-5" />
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
