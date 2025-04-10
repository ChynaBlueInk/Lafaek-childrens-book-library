import Link from "next/link"
import Image from "next/image"
import { Book, Download, Home, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadsPage() {
  // Sample downloaded books data
  const downloadedBooks = [
    {
      id: 1,
      title: "The Lafaek Adventure",
      cover: "/placeholder.svg?height=200&width=150&text=Book1",
      downloadDate: "2025-04-05",
    },
    {
      id: 3,
      title: "Ocean Explorers",
      cover: "/placeholder.svg?height=200&width=150&text=Book3",
      downloadDate: "2025-04-03",
    },
    {
      id: 5,
      title: "Fairy Tales",
      cover: "/placeholder.svg?height=200&width=150&text=Book5",
      downloadDate: "2025-04-01",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 p-4 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative h-16 w-16 mr-2">
              <Image src="/images/lafaek-logo.png" alt="Lafaek Logo" fill className="object-contain" />
            </div>
            <h1 className="text-center text-2xl font-bold text-white drop-shadow-md">Downloaded Books</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <p className="text-gray-700">
            Books you download will be available to read even when you don't have an internet connection.
          </p>
        </div>

        {downloadedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {downloadedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200">
                <div className="flex p-4">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded-lg border border-orange-200"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-800">{book.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Downloaded: {new Date(book.downloadDate).toLocaleDateString()}
                    </p>
                    <div className="flex mt-3 gap-2">
                      <Link href={`/book/${book.id}`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Read
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
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
            <h2 className="text-xl font-bold text-gray-700 mb-2">No Downloaded Books</h2>
            <p className="text-gray-600 mb-6">You haven't downloaded any books yet.</p>
            <Link href="/library">
              <Button className="bg-green-600 hover:bg-green-700">Browse Library</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t-2 border-orange-100 shadow-lg rounded-t-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/library" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
              <Book className="h-6 w-6" />
              <span className="text-xs mt-1">Library</span>
            </Link>
            <Link href="/downloads" className="flex flex-col items-center text-orange-600">
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

