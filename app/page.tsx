"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/books";
import AnimatedPreviewBook from "@/components/AnimatedPreviewBook";

export default function HomePage() {
  const latestBooks = [...books].sort((a, b) => b.id - a.id).slice(0, 2);

  const [progress, setProgress] = useState<{
    id: number;
    title: string;
    cover: string;
    page: number;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("continueReading");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse reading progress", e);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4] text-black">
      {/* Header */}
      <header className="w-full bg-[#6cc04a]">
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

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Welcome */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Image
              src="/images/lafaekkolega.png"
              alt="Lafaek Kolega Group"
              width={150}
              height={150}
              className="object-contain"
            />
            <div>
              <h2 className="text-3xl font-bold text-[#6cc04a] mb-2">
                Welcome to your reading adventure!
              </h2>
              <p className="text-lg text-gray-700">
                Discover amazing stories and go on exciting journeys with our collection of books!
              </p>
            </div>
          </div>
        </section>

        {/* Latest Added + Continue Reading */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold text-[#6cc04a] mb-4">Latest Added</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className="flex flex-col items-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative w-32 h-40">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h4 className="text-sm font-semibold text-black truncate">{book.title}</h4>
                      <p className="text-xs text-gray-500">{book.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold text-[#6cc04a] mb-4">Continue Reading</h3>
              {progress ? (
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                  <div className="relative w-28 h-28 shrink-0">
                    <Image
                      src={progress.cover || "/placeholder.svg"}
                      alt={progress.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-lg">{progress.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">Page {progress.page}</p>
                    <Link href={`/book/${progress.id}?page=${progress.page}`}>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                        Resume
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Start reading a book to see your progress here.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link href="/library">
            <Button className="bg-[#8fdefb] hover:bg-blue-300 text-black text-lg px-6 py-4 rounded-full shadow-md">
              Read a Book
              <Book className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/fun">
            <Button className="bg-[#f9bfcf] hover:bg-pink-200 text-black text-lg px-6 py-4 rounded-full shadow-md">
              Visit Fun Zone
              <Gamepad2 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Animated Flipbook */}
        <section className="text-center mt-12">
          <h3 className="text-2xl font-bold text-[#6cc04a] mb-4">Animated Book Preview</h3>
          <p className="text-gray-600 mb-6">
            Flip through this preview book using swipe or click! Let us know what style you like best.
          </p>
          <AnimatedPreviewBook />
        </section>
      </main>

      {/* Footer Nav */}
      <footer className="sticky bottom-0 w-full bg-white border-t border-gray-300 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-around text-gray-700 text-sm">
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
          <Link href="/about" className="flex flex-col items-center hover:text-black">
            <Info className="h-5 w-5" />
            About
          </Link>
        </div>
      </footer>
    </div>
  );
}