"use client";

import { useEffect } from "react";

export default function KomunidadeReader() {
  useEffect(() => {
    // Dynamically load the BookReader CSS and JS
    const loadScripts = async () => {
      // Prevent double-loading
      if ((window as any).BookReader) {
        initializeBookReader();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://archive.org/includes/bookreader/BookReader.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://archive.org/includes/bookreader/BookReader.js";
      script.onload = () => {
        initializeBookReader();
      };
      document.body.appendChild(script);
    };

    const initializeBookReader = () => {
      const br = new (window as any).BookReader();

      // Total number of pages
      const totalPages = 24;

      // Set up your image-based book
      br.getPageWidth = () => 800;
      br.getPageHeight = () => 1000;
      br.numLeafs = totalPages;

      br.getPageURI = function (index: number, reduce: number, rotate: number) {
        const pageNum = (index + 1).toString().padStart(3, "0");
        return `/book/komunidade/LBK-2023-Ed02/page${pageNum}.jpg`;
      };

      br.getPageSide = function (index: number) {
        return index % 2 === 0 ? "R" : "L";
      };

      br.getPageNum = function (index: number) {
        return index + 1;
      };

      br.bookTitle = "Komunidade Magazine - LBK 2023 Ed02";
      br.bookUrl = "/library/komunidade";
      br.useArrowKeys = true;

      br.init();
    };

    loadScripts();
  }, []);

  return (
    <div>
      <div id="BookReader" className="w-full h-[90vh]" />
    </div>
  );
}
