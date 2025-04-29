// lib/books.ts
export interface Book {
  id: number;
  title: string;
  category: string;
  cover: string;
  pdf: string;
  isFeatured?: boolean;
  lastReadPage?: number | null;
}

export const books: Book[] = [
  // Kiik Books
  {
    id: 1,
    title: "LK Bee Maran",
    category: "Kiik",
    cover: "/images/BS_LK/bee_maran.png",
    pdf: "/book/LK/LK_bee_maran.pdf",
    isFeatured: true,
    lastReadPage: null,
  },
  {
    id: 2,
    title: "LK Hamoos Tasi",
    category: "Kiik",
    cover: "/images/BS_LK/hamoos_tasi.png",
    pdf: "/book/LK/LK_hamoos_tasi.pdf",
    isFeatured: true,
    lastReadPage: null,
  },
  {
    id: 3,
    title: "LK Kafe Laku",
    category: "Kiik",
    cover: "/images/BS_LK/kafe_laku.png",
    pdf: "/book/LK/LK_kafe_laku.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 4,
    title: "LK Kuidadu Bee",
    category: "Kiik",
    cover: "/images/BS_LK/Kuidadu_bee.png",
    pdf: "/book/LK/LK_kuidadu_bee.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 5,
    title: "LK Tradisaun Oioin",
    category: "Kiik",
    cover: "/images/BS_LK/tradisaun_oioin.png",
    pdf: "/book/LK/LK_tradisaun_oioin.pdf",
    isFeatured: false,
    lastReadPage: null,
  },

  // Prima Books
  {
    id: 6,
    title: "LP Kanalizasaun",
    category: "Prima",
    cover: "/images/BS_LP/kanalizasaun_bee.png",
    pdf: "/book/LP/LP_kanalizasaun.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 7,
    title: "LP Adventura",
    category: "Prima",
    cover: "/images/BS_LP/adventura.png",
    pdf: "/book/LP/LP_adventura.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 8,
    title: "LP Nehan",
    category: "Prima",
    cover: "/images/BS_LP/nehan.png",
    pdf: "/book/LP/LP_nehan.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 9,
    title: "LP Panel Solar",
    category: "Prima",
    cover: "/images/BS_LP/panel_solar.png",
    pdf: "/book/LP/LP_panel_solar.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 10,
    title: "LP Salva Lenuk",
    category: "Prima",
    cover: "/images/BS_LP/salva_lenuk.png",
    pdf: "/book/LP/LP_salva_lenuk.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  {
    id: 11, // or the next available number
    title: "LBK 2023 Edition 2",
    category: "Komunidade",
    cover: "/images/BS_LBK/lbk2023ed2.png", // Add this image to public/images
    pdf: "/book/komunidade/LBK-2023-Ed02_16.02.2023.pdf",
    isFeatured: false,
    lastReadPage: null,
  },
  
];
