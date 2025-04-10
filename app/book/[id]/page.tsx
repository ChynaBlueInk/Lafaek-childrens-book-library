"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { books } from "@/lib/books"
import { useParams } from "next/navigation"

import { Viewer, Worker } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

export default function BookPage() {
  const { toast } = useToast()
  const params = useParams()
  const bookId = parseInt(params.id as string)
  const book = books.find((b) => b.id === bookId)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownload = () => {
    toast({
      title: "Book Downloaded",
      description: `"${book?.title}" has been saved for offline reading.`,
      duration: 3000,
    })
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-orange-50">
        <h1 className="text-3xl font-bold text-red-600">Book Not Found</h1>
        <p className="text-gray-700 mt-4">We couldn't find the book you were looking for.</p>
        <Link href="/library">
          <Button className="mt-6">Back to Library</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 p-3 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/library" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-center flex-1 text-xl font-bold text-white drop-shadow-md">{book.title}</h1>
          <Button variant="outline" size="sm" className="bg-white text-orange-600 border-none" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            <span className="text-xs">Download</span>
          </Button>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {isClient ? (
          <div className="w-full max-w-5xl h-[80vh] bg-white border-2 border-orange-200 rounded-md shadow-md">
<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
<Viewer fileUrl={book.pdf} />
            </Worker>
          </div>
        ) : (
          <div className="text-gray-500 italic">Loading book...</div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t-2 border-orange-100 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-3">
            <Link href="/" className="flex items-center text-gray-500 hover:text-orange-600 mx-4">
              <Home className="h-6 w-6" />
              <span className="text-xs ml-1">Home</span>
            </Link>
            <Link href="/library" className="flex items-center text-gray-500 hover:text-orange-600 mx-4">
              <ChevronLeft className="h-6 w-6" />
              <span className="text-xs ml-1">Back to Library</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
