// lib/books.ts
export interface Book {
    id: number
    title: string
    cover: string
    pdf: string
    isFeatured?: boolean
    lastReadPage?: number | null
  }
  
  export const books: Book[] = [
    {
      id: 1,
      title: "Hide and Seek",
      cover: "/images/jungle-adventure.jpg", // Placeholder image for now
      pdf: "/books/HIDE-AND-SEEK.pdf",
      isFeatured: true,
      lastReadPage: null,
    },
    {
      id: 2,
      title: "Hammy the Hamster",
      cover: "/images/HammyTheHamster_Cover.png", // ✅ Your actual cover
      pdf: "/books/HAMMY-THE-HAMSTER.pdf",
      isFeatured: true,
      lastReadPage: null,
    },
  ]
  