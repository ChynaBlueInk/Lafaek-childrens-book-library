"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/lib/books";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Kiik", "Prima", "Komunidade"];

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "" || book.category === selectedCategory;
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            sizes="100vw"
          />
        </div>
      </header>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 mt-6">
        <div className="relative max-w-md mx-auto mb-4">
          <Input
            placeholder="Search for books..."
            className="pl-10 pr-4 py-2 rounded-full bg-white text-black border border-green-300 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              size="sm"
            >
              {category}
            </Button>
          ))}
          <Button
            onClick={() => {
              setSelectedCategory("");
              setSearchTerm("");
            }}
            variant="ghost"
            className="text-sm text-gray-600 hover:text-black"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Book Grid */}
      <main className="flex-1 container mx-auto px-4 pb-20">
        <h2 className="text-xl font-bold text-[#6cc04a] mb-4">
          {selectedCategory || "All"} Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} className="group">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square mb-2 transition-transform group-hover:scale-105 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                  <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <span className="text-sm text-center text-gray-800 font-medium truncate w-full">
                  {book.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t border-gray-300 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3 text-gray-700 text-sm">
            <Link href="/" className="flex flex-col items-center hover:text-black">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/library" className="flex flex-col items-center text-[#6cc04a] font-semibold">
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
        </div>
      </nav>
    </div>
  );
}
