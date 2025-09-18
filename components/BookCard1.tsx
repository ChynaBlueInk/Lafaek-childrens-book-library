"use client";

import { useState } from "react";
import BookModal from "@/components/BookModal";

interface BookProps {
  book: {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    ageRange: string;
    premium: boolean;
    pdf?: string;
    imagesFolder?: string;
  };
}

export default function BookCard({ book }: BookProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer w-48 border rounded-lg overflow-hidden shadow"
        onClick={() => setOpen(true)}
      >
        <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
        <div className="p-2">
          <h3 className="text-sm font-semibold">{book.title}</h3>
          <p className="text-xs text-muted-foreground">{book.ageRange}</p>
        </div>
      </div>

      {open && (
        <BookModal
          book={{
            ...book,
            id: book.id,
            pdf: book.pdf,
            imagesFolder: book.imagesFolder,
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
