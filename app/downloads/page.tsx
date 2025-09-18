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
  page?: number;
}

export default function DownloadsPage() {
  const [downloadedBooks, setDownloadedBooks] = useState<DownloadedBook[]>([]);
  const [progress, setProgress] = useState<any>(null);

  // Load downloads and reading progress
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

    const savedProgress = localStorage.getItem("continueReading");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (err) {
        console.error("Failed to parse continue reading:", err);
        setProgress(null);
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
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md mb-6">
          <p className="text-gray-700 text-sm">
            Books you download will be available to read even when you don’t
            have an internet connection.
          </p>
        </div>

        {downloadedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {downloadedBooks.map((book) => {
              const isInProgress = progress && progress.id === book.id;
              return (
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
                        <Link
                          href={
                            isInProgress
                              ? `/book/${book.id}?page=${progress.page}`
                              : `/book/${book.id}`
                          }
                        >
                          <Button
                            size="sm"
                            className="bg-green-700 hover:bg-green-800 text-white"
                          >
                            {isInProgress ? "Resume" : "Read"}
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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Download className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              No books saved yet — try downloading one!
            </h2>
            <p className="text-gray-500 mb-6">
              You haven’t downloaded any books yet.
            </p>
            <Link href="/library">
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                Browse Library
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
