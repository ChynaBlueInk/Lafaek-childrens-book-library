import Link from "next/link"
import Image from "next/image"
import { Book, Download, Home, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { books } from "@/lib/books" // ✅ Use real book data here

export default function LibraryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="relative h-16 w-16 mr-2">
              <Image src="/images/lafaek-logo.png" alt="Lafaek Logo" fill className="object-contain" />
            </div>
            <h1 className="text-center text-2xl font-bold text-white drop-shadow-md">Library</h1>
          </div>
          <div className="relative max-w-md mx-auto">
            <Input
              placeholder="Search for books..."
              className="pl-10 pr-4 py-2 rounded-full border-2 border-orange-300 focus:border-orange-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-600 mb-2">Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All Books", "Adventure", "Fantasy", "Animals", "Science", "History"].map((category) => (
              <Button
                key={category}
                variant={category === "All Books" ? "default" : "outline"}
                className={category === "All Books" ? "bg-green-600" : ""}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-green-600 mb-4">All Books</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} className="group">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] mb-2 transition-transform group-hover:scale-105">
                  <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover rounded-lg border-2 border-orange-200 shadow-md"
                  />
                </div>
                <span className="text-sm text-center text-gray-700 font-medium">{book.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t-2 border-orange-100 shadow-lg rounded-t-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/library" className="flex flex-col items-center text-orange-600">
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
