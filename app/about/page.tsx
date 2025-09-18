"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center bg-white text-black">
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

        <h2 className="text-xl font-bold text-[#219653] mb-4 text-center">
          Our Mission
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          Lafaek Learning Media is dedicated to making reading fun and
          accessible for children of all ages. Our app provides a safe,
          engaging environment where kids can explore stories, learn new
          things, and develop a lifelong love of reading.
        </p>

        <p className="text-gray-600 mb-4 text-sm">
          With colorful illustrations, interactive elements, and a growing
          library of books, we aim to inspire imagination and creativity in
          young minds.
        </p>

        <p className="text-gray-600 text-sm">
          Parents can feel confident knowing that all content is
          age-appropriate and educational, while kids will love the fun,
          easy-to-use interface designed just for them.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 max-w-md w-full mb-8">
        <h2 className="text-xl font-bold text-[#219653] mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Have questions, suggestions, or feedback? We'd love to hear from
          you! Our team is dedicated to improving Lafaek Learning Media and
          making it the best reading app for children.
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
  );
}
