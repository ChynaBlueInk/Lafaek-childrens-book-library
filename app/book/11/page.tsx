"use client";

import React from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

// Flipbook page component
const Page = React.forwardRef<HTMLDivElement, { src: string; alt: string }>(
  ({ src, alt }, ref) => (
    <div ref={ref} className="h-full w-full bg-white p-2">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
);
Page.displayName = "Page";

export default function Book11Flipbook() {
  const basePath = "/images/BS_LBK/LBKEd22023/";
  const pageCount = 24;

  const pages = Array.from({ length: pageCount }).map((_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: `${basePath}LBK-2023-Ed02-${num}.png`,
      alt: `Page ${i + 1}`,
    };
  });

  return (
    <div className="flex justify-center bg-[#f0fdf4] min-h-screen py-10 px-2">
      <HTMLFlipBook
        className="flipbook"
        startPage={0}
        width={350}
        height={500}
        size="stretch"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        drawShadow={true}
        showCover={true}
        mobileScrollSupport={true}
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
        style={{ margin: "0 auto" }}
      >
        {pages.map((page, index) => (
          <Page key={index} src={page.src} alt={page.alt} />
        ))}
      </HTMLFlipBook>
    </div>
  );
}
