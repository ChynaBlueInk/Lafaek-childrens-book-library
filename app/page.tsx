"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Book, Download, Home, Info, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { books } from "@/lib/books"

export default function HomePage() {
  const featuredBooks = books.filter((book) => book.isFeatured)

  const [progress, setProgress] = useState<{
    id: number
    title: string
    cover: string
    page: number
  } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("continueReading")
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse reading progress", e)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="relative h-28 w-28 mb-2">
            <Image src="/images/lafaek-logo.png" alt="Lafaek Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-white drop-shadow-md">
            Lafaek Learning Media
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">Welcome to your reading adventure!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Discover amazing stories and go on exciting journeys with our collection of books!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Featured Books */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Featured Books</h3>
            <div className="grid grid-cols-3 gap-3">
              {featuredBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`} className="flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] mb-2">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover rounded-lg border-2 border-orange-200"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-700">{book.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Continue Reading */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-600 mb-4">Continue Reading</h3>
            {progress ? (
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-28">
                  <Image
                    src={progress.cover || "/placeholder.svg"}
                    alt={progress.title}
                    fill
                    className="object-cover rounded-lg border-2 border-orange-200"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{progress.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">Page {progress.page}</p>
                  <Link href={`/book/${progress.id}?page=${progress.page}`}>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Resume
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Start reading a book to see your progress here.</p>
            )}
          </div>
        </div>

        {/* Main Action Buttons */}
        <Link href="/library" className="mt-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full px-8 py-6 text-xl font-bold shadow-lg transition-transform hover:scale-105"
          >
            Read a Book
            <Book className="ml-2 h-6 w-6" />
          </Button>
        </Link>

        {/* New Fun Zone Button */}
        <Link href="/fun" className="mt-2">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-xl font-bold shadow-lg transition-transform hover:scale-105"
          >
            Visit Fun Zone
            <Gamepad2 className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t-2 border-orange-100 shadow-lg rounded-t-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link href="/" className="flex flex-col items-center text-orange-600">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/library" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Book className="h-6 w-6" />
              <span className="text-xs mt-1">Library</span>
            </Link>
            <Link href="/downloads" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Download className="h-6 w-6" />
              <span className="text-xs mt-1">Downloads</span>
            </Link>
            <Link href="/about" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Info className="h-6 w-6" />
              <span className="text-xs mt-1">About</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
