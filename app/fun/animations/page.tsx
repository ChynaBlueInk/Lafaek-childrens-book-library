"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AnimationsPage() {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)

  const animations = [
    { id: "bouncing", name: "Bouncing Ball", color: "#4ECDC4" },
    { id: "floating", name: "Floating Clouds", color: "#4ECDC4" },
    { id: "spinning", name: "Spinning Shapes", color: "#4ECDC4" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-teal-600">Fun Animations</h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {animations.map((anim) => (
            <motion.div key={anim.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="w-full h-16 text-lg font-medium"
                style={{ backgroundColor: anim.color }}
                onClick={() => setActiveAnimation(anim.id)}
              >
                {anim.name}
              </Button>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[400px] relative bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center">
              {activeAnimation === "bouncing" && <BouncingBallAnimation />}
              {activeAnimation === "floating" && <FloatingCloudsAnimation />}
              {activeAnimation === "spinning" && <SpinningShapesAnimation />}
              {!activeAnimation && (
                <div className="text-center text-gray-500">
                  <p className="text-xl">Select an animation above!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BouncingBallAnimation() {
  return (
    <div className="w-full h-full relative">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            backgroundColor: `hsl(${i * 60}, 80%, 60%)`,
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
          }}
          animate={{
            y: [0, 200, 0],
          }}
          transition={{
            duration: 1 + i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function FloatingCloudsAnimation() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + i * 15}%`,
          }}
          initial={{ x: -100 }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 15 - i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay: i * 2,
          }}
        >
          <div className="bg-white rounded-full w-16 h-16 filter blur-md opacity-80" />
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="text-5xl">🌈</div>
      </motion.div>
    </div>
  )
}

function SpinningShapesAnimation() {
  const shapes = [
    { color: "#FF6B6B", shape: "square" },
    { color: "#FFD166", shape: "triangle" },
    { color: "#4ECDC4", shape: "circle" },
    { color: "#9D65C9", shape: "star" },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center">
      {shapes.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay: i * 0.5,
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: item.shape === "circle" ? "50%" : item.shape === "square" ? "0%" : "",
            backgroundColor: item.color,
            margin: `${i * 20}px`,
            zIndex: 10 - i,
          }}
        >
          {item.shape === "triangle" && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "30px solid transparent",
                borderRight: "30px solid transparent",
                borderBottom: `60px solid ${item.color}`,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
          {item.shape === "star" && (
            <div className="text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">⭐</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
