"use client";

import Link from "next/link";
import Image from "next/image";
import { Book, Download, Home, Info, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface DownloadedBook {
  id: number;
  title: string;
  cover: string;
  downloadDate: string;
}

export default function DownloadsPage() {
  const [downloadedBooks, setDownloadedBooks] = useState<DownloadedBook[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("downloads");
    if (stored) {
      try {
        setDownloadedBooks(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse downloads:", err);
        setDownloadedBooks([]);
      }
    }
  }, []);

  // Remove a book from downloads
  const handleDelete = (id: number) => {
    const updated = downloadedBooks.filter((book) => book.id !== id);
    setDownloadedBooks(updated);
    localStorage.setItem("downloads", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-green-700 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative h-16 w-16 mr-2">
              <Image
                src="/images/lafaek-logo.png"
                alt="Lafaek Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-center text-2xl font-bold text-white drop-shadow-md">
              Downloaded Books
            </h1>
          </div>
        </div>
      </header>

      {/* Info */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-md mb-6">
          <p className="text-gray-300">
            Books you download will be available to read even when you don’t
            have an internet connection.
          </p>
        </div>

        {/* Downloaded Books */}
        {downloadedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {downloadedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-gray-900 rounded-xl border border-gray-700 shadow-md"
              >
                <div className="flex p-4">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md border border-gray-600"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-white">{book.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Downloaded:{" "}
                      {new Date(book.downloadDate).toLocaleDateString()}
                    </p>
                    <div className="flex mt-3 gap-2">
                      <Link href={`/book/${book.id}`}>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Read
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-300 hover:bg-red-900/20"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Download className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-200 mb-2">
              No Downloaded Books
            </h2>
            <p className="text-gray-400 mb-6">
              You haven’t downloaded any books yet.
            </p>
            <Link href="/library">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Browse Library
              </Button>
            </Link>
          </div>
        )}
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
            <Link href="/downloads" className="flex flex-col items-center text-green-400">
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
