"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books as bookData } from "@/lib/books";
import BookCard from "@/components/BookCard1";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [books] = useState(bookData);

  const categories = [
    "Lafaek Kiik",
    "Lafaek Prima",
    "Lafaek Manorin",
    "Lafaek Komunidade",
    "Reading Books",
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || book.category === selectedCategory;

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <Input
          placeholder="Search for books..."
          className="pl-10 pr-4 py-2 rounded-full bg-white text-black border border-green-300 focus:border-green-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-2 flex-wrap mb-6">
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
                ? "bg-[#219653] text-white"
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

      {/* Book Grid */}
      <h2 className="text-xl font-bold text-[#219653] mb-4 text-center">
        {selectedCategory || "All"} Books
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={{
              id: book.id,
              title: book.title,
              description: "Enjoy reading this book!",
              coverImage: book.cover,
              ageRange: book.category,
              premium: false,
              pdf: book.pdf,
              imagesFolder: book.imagesFolder,
            }}
          />
        ))}
      </div>
    </main>
  );
}
