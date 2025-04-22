// lib/books.ts
export interface Book {
  id: number;
  title: string;
  cover: string;
  pdf: string;
  isFeatured?: boolean;
  lastReadPage?: number | null;
}

export const books: Book[] = [
  {
    id: 1,
    title: "LK Bee Maran",
    cover: "/images/BS_LK/bee_maran.png",
    pdf: "/book/LK/LK_bee_maran.pdf",
    isFeatured: true,
    lastReadPage: null,
  },
  {
    id: 2,
    title: "LK Hamoos Tasi",
    cover: "/images/BS_LK/hamoos_tasi.png",
    pdf: "/book/LK/LK_hamoos_tasi.pdf",
    isFeatured: true,
    lastReadPage: null,
  },
  {
    id: 3,
    title: "LK Kafe Laku",
    cover: "/images/BS_LK/kafe_laku.png",
    pdf: "/book/LK/LK_kafe_laku.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 4,
    title: "LK Kuidadu Bee",
    cover: "/images/BS_LK/Kuidadu_bee.png",
    pdf: "/book/LK/LK_kuidadu_bee.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 5,
    title: "LK Tradisaun Oioin",
    cover: "/images/BS_LK/tradisaun_oioin.png",
    pdf: "/book/LK/LK_tradisaun_oioin.pdf",
    isFeatured: false,
    lastReadPage: null,
  }
];
