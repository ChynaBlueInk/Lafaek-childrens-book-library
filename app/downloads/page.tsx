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

      {/* Info */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md mb-6">
          <p className="text-gray-700 text-sm">
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
                className="bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex p-4">
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md border border-gray-300"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-black">{book.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
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
                        className="text-red-500 border-red-300 hover:bg-red-100"
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
            <Download className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No Downloaded Books
            </h2>
            <p className="text-gray-500 mb-6">
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
            <Link href="/downloads" className="flex flex-col items-center text-[#6cc04a] font-semibold">
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
