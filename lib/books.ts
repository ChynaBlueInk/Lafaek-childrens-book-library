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
      cover: "/images/hide-and-seek-final.png", 
      pdf: "/book/HIDE-AND-SEEK.pdf",
      isFeatured: true,
      lastReadPage: null,
    },
    {
      id: 2,
      title: "Hammy the Hamster",
      cover: "/images/HammyTheHamster_Cover.png", // ✅ Your actual cover
      pdf: "/book/HAMMY-THE-HAMSTER.pdf",
      isFeatured: true,
      lastReadPage: null,
    },
    {
      id: 3,
      title: "Mau Sesta nia Adventura",
      cover: "/images/BS_LP/mauSesta_nia_adventura.png",  // update if you renamed it
      pdf: "/book/LP_nia_adventura.pdf",
      isFeatured: false,
      lastReadPage: null,
    },
    
  ]
  