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
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-green-700 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="relative h-16 w-16 mr-2">
              <Image
                src="/images/lafaek-logo.png"
                alt="Lafaek Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-center text-2xl font-bold text-white drop-shadow-md">
              Library
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-4">
            <Input
              placeholder="Search for books..."
              className="pl-10 pr-4 py-2 rounded-full bg-white text-black border border-green-300 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Filters */}
          <div className="flex justify-center gap-2 flex-wrap">
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
                    : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
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
              className="text-sm text-white"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-green-400 mb-4">
          {selectedCategory || "All"} Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} className="group">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square mb-2 transition-transform group-hover:scale-105 border border-gray-700 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-center text-gray-300 font-medium truncate">
                  {book.title}
                </span>
              </div>
            </Link>
          ))}
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
            <Link href="/library" className="flex flex-col items-center text-green-400">
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
        </div>
      </nav>
    </div>
  );
}
