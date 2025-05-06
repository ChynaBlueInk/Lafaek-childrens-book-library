"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { Button } from "@/components/ui/button";

interface PageProps {
  number: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ number }, ref) => (
  <div ref={ref} className="h-full w-full bg-white p-4 rounded-xl">
    <div className="relative w-full h-full">
      <Image
        src={`/images/anim${number}.png`}
        alt={`Page ${number}`}
        fill
        className="object-contain rounded-xl"
      />
    </div>
  </div>
));

Page.displayName = "Page";

export default function DemoBookPage() {
  const bookRef = useRef<any>(null);

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col items-center justify-center text-black">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button className="bg-[#6cc04a] text-white hover:bg-green-700 rounded-full px-4">
            ← Back
          </Button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#6cc04a] mb-4">
        Full Page Animated Book Demo
      </h1>
      <p className="text-gray-600 mb-6 text-center px-4 max-w-xl">
        Swipe on mobile or tap the corners to turn the pages.
      </p>

      {/* Flipbook Viewer */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg shadow-xl">
        <HTMLFlipBook
          width={300}
          height={400}
          size="stretch"
          minWidth={300}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          drawShadow={true}
          showCover={true}
          mobileScrollSupport={true}
          className="flipbook rounded-lg"
          startPage={0}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
          ref={bookRef}
          style={{}} // ✅ Required to satisfy IProps type
        >
          <Page number={1} />
          <Page number={2} />
          <Page number={3} />
          <Page number={4} />
        </HTMLFlipBook>
      </div>
    </div>
  );
}
