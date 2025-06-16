"use client";

import { useState } from "react";
import { X, Heart, Download } from "lucide-react";

export default function BookModal({ book, onClose }: any) {
  const [rating, setRating] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    // TODO: Save to DynamoDB once user auth is active
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="text-black" />
        </button>

        <img src={book.coverImage} alt={book.title} className="w-full h-56 object-cover rounded-md" />
        <h2 className="mt-4 text-xl font-bold">{book.title}</h2>
        <p className="text-sm text-gray-600">{book.description}</p>

        <div className="flex items-center mt-4 gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Heart
              key={i}
              onClick={() => handleRate(i)}
              className={`w-5 h-5 cursor-pointer ${i <= rating ? "fill-red-500 stroke-red-500" : "stroke-gray-400"}`}
            />
          ))}
        </div>

        <button
          className="mt-4 w-full bg-[hsl(var(--banner))] text-white px-4 py-2 rounded shadow hover:bg-green-800 transition"
          onClick={() => alert("Download clicked")}
        >
          <Download className="inline-block w-4 h-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
}
