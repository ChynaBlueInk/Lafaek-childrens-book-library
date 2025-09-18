"use client";

import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

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

export default function AnimatedPreviewBook() {
  const bookRef = useRef<any>(null); // ✅ Fixed: using 'any' instead of PageFlip

  return (
    <div className="flex flex-col items-center">
      <HTMLFlipBook
        width={300}
        height={400}
        size="stretch"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        drawShadow={true}
        showCover={true}
        mobileScrollSupport={true}
        className="flipbook shadow-lg"
        style={{ margin: "0 auto" }}
        startPage={0}
        flippingTime={500}
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
      >
        <Page number={1} />
        <Page number={2} />
        <Page number={3} />
        <Page number={4} />
      </HTMLFlipBook>
    </div>
  );
}
