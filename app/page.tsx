"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book, Gamepad2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [progress, setProgress] = useState<{
    id: number;
    title: string;
    cover: string;
    page: number;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("continueReading");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse reading progress", e);
      }
    }
  }, []);

  const handleRemoveProgress = () => {
    localStorage.removeItem("continueReading");
    setProgress(null);
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      {/* Welcome */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Image
            src="/images/lafaekkolega.png"
            alt="Lafaek Kolega Group"
            width={150}
            height={150}
            className="object-contain"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#219653] mb-2">
              Welcome to your reading adventure!
            </h2>
            <p className="text-lg text-[#4F4F4F]">
              Discover amazing stories and go on exciting journeys with our
              collection of books!
            </p>
          </div>
        </div>
      </section>

      {/* Continue Reading (only shows if progress exists) */}
      {progress && (
        <section className="mb-12">
          <h3 className="text-xl font-bold text-[#219653] mb-4 text-center">
            Continue Reading
          </h3>
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[#BDBDBD] shadow-sm max-w-md mx-auto relative">
            <button
              onClick={handleRemoveProgress}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label="Remove from Continue Reading"
            >
              <XCircle className="h-5 w-5" />
            </button>
            <div className="relative w-28 h-28 shrink-0">
              <Image
                src={progress.cover || "/placeholder.svg"}
                alt={progress.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#333333] text-lg">
                {progress.title}
              </h4>
              <p className="text-sm text-[#828282] mb-2">
                Page {progress.page}
              </p>
              <Link href={`/book/${progress.id}?page=${progress.page}`}>
                <Button
                  size="sm"
                  className="bg-[#219653] hover:bg-green-800 text-white rounded-full"
                >
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Link href="/library">
          <Button className="bg-[#2F80ED] hover:bg-blue-600 text-white text-lg px-6 py-4 rounded-full shadow-md">
            Read a Book
            <Book className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <Link href="/fun">
          <Button className="bg-[#F2C94C] hover:bg-yellow-400 text-[#333333] text-lg px-6 py-4 rounded-full shadow-md">
            Visit Fun Zone
            <Gamepad2 className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
