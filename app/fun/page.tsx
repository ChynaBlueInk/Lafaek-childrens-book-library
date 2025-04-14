export const dynamic = "force-dynamic";

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Gamepad2, Music, Palette, Star, PuzzleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const menuItems = [
    { id: "games", icon: <Gamepad2 size={32} />, label: "Games", color: "#FF6B6B", path: "/fun/games" },
    { id: "animations", icon: <Star size={32} />, label: "Animations", color: "#4ECDC4", path: "/fun/animations" },
    { id: "music", icon: <Music size={32} />, label: "Music", color: "#FFD166", path: "/fun/music" },
    { id: "drawing", icon: <Palette size={32} />, label: "Drawing", color: "#9D65C9", path: "/fun/drawing" },
    { id: "dragdrop", icon: <PuzzleIcon size={32} />, label: "Drag & Drop", color: "#5CB85C", path: "/fun/dragdrop" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-600 mb-2">Kid's Fun Zone</h1>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="text-xl text-center text-purple-500"
        >
          Let's play and learn!
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredButton(item.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative"
            >
              <Button
                className="w-full h-32 rounded-2xl flex flex-col items-center justify-center gap-2 border-4 border-white shadow-lg"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
                <span className="text-xl font-bold text-white">{item.label}</span>
              </Button>

              {hoveredButton === item.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-2 -right-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
                  >
                    <Star size={24} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        className="fixed bottom-0 w-full max-w-7xl mx-auto"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex justify-center p-4">
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 rounded-full bg-purple-400"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
