"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Book, Gamepad2, Info } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-[#219653] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Banner */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-36 h-12 sm:w-48 sm:h-16">
            <Image
              src="/images/lafaekbanner.png"
              alt="Lafaek Banner"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-white font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-[#F2C94C]">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link href="/library" className="flex items-center gap-1 hover:text-[#F2C94C]">
            <Book className="h-5 w-5" />
            Library
          </Link>
          <Link href="/fun" className="flex items-center gap-1 hover:text-[#F2C94C]">
            <Gamepad2 className="h-5 w-5" />
            Fun Zone
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-[#F2C94C]">
            <Info className="h-5 w-5" />
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
