"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DemoBookPage() {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && page < totalPages) setPage(page + 1);
    if (direction === "right" && page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col items-center justify-center text-black">
      {/* Back to Home */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button className="bg-[#6cc04a] text-white hover:bg-green-700 rounded-full px-4">
            ← Back
          </Button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#6cc04a] mb-4">Full Page Animated Book Demo</h1>
      <p className="text-gray-600 mb-6 text-center px-4 max-w-xl">
        Swipe on mobile or click the buttons below to navigate through the animated book preview.
      </p>

      {/* Book Viewer */}
      <div
        className="relative bg-white rounded-xl shadow-lg border max-w-3xl w-full p-6 touch-pan-x"
        onTouchStart={(e) => (window as any).startX = e.touches[0].clientX}
        onTouchEnd={(e) => {
          const diff = e.changedTouches[0].clientX - (window as any).startX;
          if (diff > 50) handleSwipe("right");
          else if (diff < -50) handleSwipe("left");
        }}
      >
        <Image
          src={`/images/anim${page}.png`}
          alt={`Book Page ${page}`}
          width={1000}
          height={700}
          className="rounded-md mx-auto object-contain"
        />

        {/* Nav Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-gray-200 hover:bg-gray-300 text-black"
          >
            ⬅ Back
          </Button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="bg-gray-200 hover:bg-gray-300 text-black"
          >
            Next ➡
          </Button>
        </div>
      </div>
    </div>
  );
}
