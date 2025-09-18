import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Link from "next/link";
import { Home, Book, Download, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Lafaek Children's Library",
  description: "Discover books, fun, and learning adventures",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/bookreader/BookReader.css" />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-[#333333]">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>

        {/* Footer */}
        <footer className="sticky bottom-0 w-full bg-[#219653] z-50">
          <div className="container mx-auto px-4 py-3 flex justify-around text-white text-sm">
            <Link href="/" className="flex flex-col items-center hover:text-[#F2C94C]">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/library" className="flex flex-col items-center hover:text-[#F2C94C]">
              <Book className="h-5 w-5" />
              Library
            </Link>
            <Link href="/downloads" className="flex flex-col items-center hover:text-[#F2C94C]">
              <Download className="h-5 w-5" />
              Downloads
            </Link>
            <Link href="/about" className="flex flex-col items-center hover:text-[#F2C94C]">
              <Info className="h-5 w-5" />
              About
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
