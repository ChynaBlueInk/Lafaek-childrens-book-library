"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/books";

export default function HomePage() {
  const featuredBooks = books.filter((book) => book.isFeatured);

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
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-green-700 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="relative h-28 w-28 mb-2">
            <Image
              src="/images/lafaek-logo.png"
              alt="Lafaek Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-white drop-shadow-md">
            Lafaek Learning Media
          </h1>
        </div>
      </header>

      {/* Welcome */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">
            Welcome to your reading adventure!
          </h2>
          <p className="text-lg text-gray-300">
            Discover amazing stories and go on exciting journeys with our
            collection of books!
          </p>
        </section>

        {/* Featured Books */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-green-400 mb-4">Featured Books</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredBooks.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-gray-700 shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent w-full p-2 text-xs text-white text-center truncate">
                  {book.title}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Continue Reading */}
        <section className="mb-10">
          <h3 className="text-xl font-bold text-green-400 mb-4">Continue Reading</h3>
          {progress ? (
            <div className="flex items-center gap-4 bg-gray-900 rounded-xl p-4 border border-gray-700">
              <div className="relative w-20 h-28 shrink-0">
                <Image
                  src={progress.cover || "/placeholder.svg"}
                  alt={progress.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white">{progress.title}</h4>
                <p className="text-sm text-gray-400 mb-2">Page {progress.page}</p>
                <Link href={`/book/${progress.id}?page=${progress.page}`}>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Resume
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Start reading a book to see your progress here.
            </p>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/library">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-4 rounded-full shadow-md">
              Read a Book
              <Book className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/fun">
            <Button className="bg-white text-black text-lg px-6 py-4 rounded-full shadow-md hover:bg-gray-100">
              Visit Fun Zone
              <Gamepad2 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="sticky bottom-0 w-full bg-gray-900 border-t border-gray-800 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-around text-gray-400 text-sm">
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
          <Link href="/about" className="flex flex-col items-center hover:text-white">
            <Info className="h-5 w-5" />
            About
          </Link>
        </div>
      </footer>
    </div>
  );
}
