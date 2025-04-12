"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";

// Set up the worker correctly — do NOT disable it
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ChevronLeft, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { books } from "@/lib/books";


// Disable the worker to avoid the importScripts error.
// (For now we disable worker; later, if you want to fix worker issues, we can revisit that.)
(pdfjs as any).disableWorker = true;

export default function BookPage() {
  // Use destructuring to extract the toast function.
  const { toast } = useToast();
  const params = useParams();

  const rawId = (params as { id: string })?.id;
  const bookId = rawId ? Number(rawId) : null;
  const book = books.find((b) => b.id === bookId);

  // Debug logs: (You can remove these once confirmed)
  console.log("params:", params);
  console.log("rawId:", rawId);
  console.log("bookId:", bookId);
  console.log("book:", book);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1);

  // Dynamically adjust the scale based on the first page’s dimensions.
  const handlePageLoadSuccess = (page: any) => {
    const desiredWidth = 600; // Adjust as desired.
    const viewport = page.getViewport({ scale: 1 });
    const newScale = desiredWidth / viewport.width;
    setScale(newScale);
  };

  const handleDownload = () => {
    toast({
      title: "Book Downloaded",
      description: `"${book?.title}" has been saved for offline reading.`,
      duration: 3000,
    });
  };

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-orange-50">
        <h1 className="text-3xl font-bold text-red-600">Book Not Found</h1>
        <p className="text-gray-700 mt-4">We couldn't find the book you were looking for.</p>
        <Link href="/library">
          <Button className="mt-6">Back to Library</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 p-3 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/library" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex-1 text-xl font-bold text-white text-center">{book.title}</h1>
          <a href={book.pdf} download onClick={handleDownload}>
            <Button variant="outline" size="sm" className="bg-white text-orange-600 border-none">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </a>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white border-2 border-orange-200 rounded-md shadow-md p-4">
          <Document file={book.pdf} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from(new Array(numPages ?? 0), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                onLoadSuccess={index === 0 ? handlePageLoadSuccess : undefined}
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            ))}
          </Document>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-around">
          <Link href="/" className="flex items-center text-gray-500 hover:text-orange-600">
            <Home className="h-6 w-6" />
            <span className="text-xs ml-1">Home</span>
          </Link>
          <Link href="/library" className="flex items-center text-gray-500 hover:text-orange-600">
            <ChevronLeft className="h-6 w-6" />
            <span className="text-xs ml-1">Back to Library</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
