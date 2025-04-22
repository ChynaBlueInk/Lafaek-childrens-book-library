"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import { useSwipeable } from "react-swipeable";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightCircle,
  ChevronLeftCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { books } from "@/lib/books";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default function BookPage() {
  const { toast } = useToast();
  const params = useParams();
  const searchParams = useSearchParams();

  const rawId = (params as { id: string })?.id;
  const bookId = rawId ? Number(rawId) : null;
  const book = books.find((b) => b.id === bookId);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [scale, setScale] = useState<number>(1);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handlePageLoadSuccess = (page: any) => {
    const viewport = page.getViewport({ scale: 1 });
    setPageSize({ width: viewport.width, height: viewport.height });

    const screenWidth = window.innerWidth;
    const baseWidth = Math.min(screenWidth * 0.9, 800);
    const newScale = baseWidth / viewport.width;
    setScale(newScale);
  };

  const handleDownload = () => {
    if (!book) return;

    const stored = localStorage.getItem("downloads");
    let downloads = stored ? JSON.parse(stored) : [];

    const alreadyExists = downloads.some((b: any) => b.id === book.id);
    if (!alreadyExists) {
      const newDownload = {
        id: book.id,
        title: book.title,
        cover: book.cover || "/placeholder.svg",
        downloadDate: new Date().toISOString(),
      };
      downloads.push(newDownload);
      localStorage.setItem("downloads", JSON.stringify(downloads));
    }

    toast({
      title: "Book Downloaded",
      description: `"${book.title}" has been saved for offline reading.`,
      duration: 3000,
    });
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (book) {
      const progress = {
        id: book.id,
        title: book.title,
        cover: book.cover || "/placeholder.svg",
        page: pageNum,
      };
      localStorage.setItem("continueReading", JSON.stringify(progress));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage < (numPages || 0)) {
        handlePageChange(currentPage + 1);
      }
    },
    onSwipedRight: () => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    },
    trackMouse: true,
  });

  const isMobilePortrait =
    typeof window !== "undefined" &&
    window.innerWidth < 768 &&
    window.innerHeight > window.innerWidth;
  const isPortrait = pageSize.height > pageSize.width;

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-black text-white">
        <h1 className="text-3xl font-bold text-red-500">Book Not Found</h1>
        <p className="text-gray-400 mt-4">We couldn't find the book you were looking for.</p>
        <Link href="/library">
          <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
            Back to Library
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-green-700 p-3 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/library" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex-1 text-xl font-bold text-white text-center">{book.title}</h1>
          <a
            href={book.pdf}
            download
            onClick={handleDownload}
            className="ml-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-green-700 border-none"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </a>
        </div>
      </header>

      {/* Mobile Tip Message */}
      {isMobilePortrait && (
        <div className="bg-yellow-200 text-black text-center text-sm py-2">
          📱 For best viewing, rotate your device to landscape.
        </div>
      )}

      {/* Viewer */}
      <main className="flex-1 overflow-y-auto p-4">
        <div
          className="w-full max-w-5xl mx-auto bg-gray-900 border border-gray-700 rounded-md shadow-md p-4 relative"
          {...swipeHandlers}
        >
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-green-100"
              aria-label="Previous Page"
            >
              <ChevronLeftCircle className="h-6 w-6 text-green-700" />
            </button>
          )}

          {currentPage < (numPages || 0) && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-green-100"
              aria-label="Next Page"
            >
              <ChevronRightCircle className="h-6 w-6 text-green-700" />
            </button>
          )}

          <Document file={book.pdf} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Page
              pageNumber={currentPage}
              scale={scale}
              onLoadSuccess={handlePageLoadSuccess}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>

          <p className="text-center text-sm text-gray-400 mt-4">
            Page {currentPage} of {numPages}
          </p>
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="sticky bottom-0 w-full bg-gray-900 border-t border-gray-800 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-center">
          <Link
            href="/library"
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-xs ml-1">Back to Library</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
