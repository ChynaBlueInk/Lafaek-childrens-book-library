"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, type PanInfo } from "framer-motion"
import { ArrowLeft, Star, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DragDropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-green-600">Drag & Drop Fun</h1>
          <div className="w-20" />
        </div>

        <Tabs defaultValue="animals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="animals">Animals</TabsTrigger>
            <TabsTrigger value="shapes">Shapes</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>

          <TabsContent value="animals">
            <DragDropGame
              gameType="animals"
              items={[
                { id: "lion", emoji: "🦁", label: "Lion", targetId: "savanna" },
                { id: "fish", emoji: "🐠", label: "Fish", targetId: "ocean" },
                { id: "monkey", emoji: "🐵", label: "Monkey", targetId: "jungle" },
                { id: "penguin", emoji: "🐧", label: "Penguin", targetId: "arctic" },
                { id: "eagle", emoji: "🦅", label: "Eagle", targetId: "mountain" },
              ]}
              targets={[
                { id: "savanna", label: "Savanna", color: "#FFD166", emoji: "🌾" },
                { id: "ocean", label: "Ocean", color: "#4ECDC4", emoji: "🌊" },
                { id: "jungle", label: "Jungle", color: "#66BB6A", emoji: "🌴" },
                { id: "arctic", label: "Arctic", color: "#90CAF9", emoji: "❄️" },
                { id: "mountain", label: "Mountain", color: "#A1887F", emoji: "⛰️" },
              ]}
              instructions="Drag each animal to its correct habitat!"
            />
          </TabsContent>

          <TabsContent value="shapes">
            <DragDropGame
              gameType="shapes"
              items={[
                { id: "circle", emoji: "🔴", label: "Circle", targetId: "round" },
                { id: "square", emoji: "🟦", label: "Square", targetId: "square" },
                { id: "triangle", emoji: "🔺", label: "Triangle", targetId: "triangle" },
                { id: "star", emoji: "⭐", label: "Star", targetId: "star" },
                { id: "heart", emoji: "❤️", label: "Heart", targetId: "heart" },
              ]}
              targets={[
                { id: "round", label: "Round", color: "#FF6B6B", emoji: "⭕" },
                { id: "square", label: "Square", color: "#4ECDC4", emoji: "⬜" },
                { id: "triangle", label: "Triangle", color: "#FFD166", emoji: "📐" },
                { id: "star", label: "Star", color: "#9D65C9", emoji: "✨" },
                { id: "heart", label: "Heart", color: "#FF7096", emoji: "💓" },
              ]}
              instructions="Match each shape to its outline!"
            />
          </TabsContent>

          <TabsContent value="food">
            <DragDropGame
              gameType="food"
              items={[
                { id: "apple", emoji: "🍎", label: "Apple", targetId: "fruits" },
                { id: "carrot", emoji: "🥕", label: "Carrot", targetId: "vegetables" },
                { id: "chicken", emoji: "🍗", label: "Chicken", targetId: "protein" },
                { id: "bread", emoji: "🍞", label: "Bread", targetId: "grains" },
                { id: "milk", emoji: "🥛", label: "Milk", targetId: "dairy" },
              ]}
              targets={[
                { id: "fruits", label: "Fruits", color: "#FF6B6B", emoji: "🍇" },
                { id: "vegetables", label: "Vegetables", color: "#66BB6A", emoji: "🥦" },
                { id: "protein", label: "Protein", color: "#FFD166", emoji: "🥩" },
                { id: "grains", label: "Grains", color: "#E6C27A", emoji: "🌾" },
                { id: "dairy", label: "Dairy", color: "#90CAF9", emoji: "🧀" },
              ]}
              instructions="Sort the foods into their food groups!"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface Item {
  id: string
  emoji: string
  label: string
  targetId: string
}

interface Target {
  id: string
  label: string
  color: string
  emoji: string
}

interface DragDropGameProps {
  gameType: string
  items: Item[]
  targets: Target[]
  instructions: string
}

function DragDropGame({ gameType, items, targets, instructions }: DragDropGameProps) {
  const [draggedItems, setDraggedItems] = useState<{ [key: string]: { x: number; y: number; placed: boolean } }>({})
  const [itemPositions, setItemPositions] = useState<{ [key: string]: { x: number; y: number } }>({})
  const [targetPositions, setTargetPositions] = useState<{
    [key: string]: { x: number; y: number; width: number; height: number }
  }>({})
  const [correctPlacements, setCorrectPlacements] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize item positions
  useEffect(() => {
    // Reset state when game type changes
    setDraggedItems({})
    setCorrectPlacements([])
    setShowCelebration(false)
    setGameCompleted(false)

    // Initialize positions after a short delay to ensure rendering
    const timer = setTimeout(() => {
      const initialItemPositions: { [key: string]: { x: number; y: number } } = {}
      const initialDraggedItems: { [key: string]: { x: number; y: number; placed: boolean } } = {}

      // Get item elements and their positions
      items.forEach((item) => {
        const element = document.getElementById(`item-${item.id}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          initialItemPositions[item.id] = { x: 0, y: 0 }
          initialDraggedItems[item.id] = { x: 0, y: 0, placed: false }
        }
      })

      setItemPositions(initialItemPositions)
      setDraggedItems(initialDraggedItems)

      // Get target elements and their positions
      const initialTargetPositions: { [key: string]: { x: number; y: number; width: number; height: number } } = {}

      targets.forEach((target) => {
        const element = document.getElementById(`target-${target.id}`)
        if (element && containerRef.current) {
          const targetRect = element.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()

          initialTargetPositions[target.id] = {
            x: targetRect.left - containerRect.left,
            y: targetRect.top - containerRect.top,
            width: targetRect.width,
            height: targetRect.height,
          }
        }
      })

      setTargetPositions(initialTargetPositions)
    }, 500)

    return () => clearTimeout(timer)
  }, [gameType, items, targets])

  // Handle drag end
  const handleDragEnd = (item: Item, info: PanInfo) => {
    const { x, y } = info.point

    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const relativeX = x - containerRect.left
    const relativeY = y - containerRect.top

    // Check if the item is dropped on its correct target
    const targetPosition = targetPositions[item.targetId]

    if (targetPosition) {
      const isInTarget =
        relativeX >= targetPosition.x &&
        relativeX <= targetPosition.x + targetPosition.width &&
        relativeY >= targetPosition.y &&
        relativeY <= targetPosition.y + targetPosition.height

      if (isInTarget) {
        // Correct placement
        const newDraggedItems = {
          ...draggedItems,
          [item.id]: {
            x: targetPosition.x + targetPosition.width / 2 - 30, // Center in target
            y: targetPosition.y + targetPosition.height / 2 - 30,
            placed: true,
          },
        }

        setDraggedItems(newDraggedItems)

        if (!correctPlacements.includes(item.id)) {
          const newCorrectPlacements = [...correctPlacements, item.id]
          setCorrectPlacements(newCorrectPlacements)

          // Check if all items are correctly placed
          if (newCorrectPlacements.length === items.length) {
            setShowCelebration(true)
            setGameCompleted(true)
          }
        }

        return
      }
    }

    // If not dropped in correct target, return to original position
    setDraggedItems({
      ...draggedItems,
      [item.id]: { x: 0, y: 0, placed: false },
    })
  }

  const resetGame = () => {
    setDraggedItems(
      Object.keys(draggedItems).reduce(
        (acc, key) => {
          acc[key] = { x: 0, y: 0, placed: false }
          return acc
        },
        {} as { [key: string]: { x: number; y: number; placed: boolean } },
      ),
    )
    setCorrectPlacements([])
    setShowCelebration(false)
    setGameCompleted(false)
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold mb-2">{instructions}</h2>
        <p className="text-sm text-gray-500">Drag each item to its matching location!</p>
      </div>

      <div
        ref={containerRef}
        className="relative min-h-[500px] border-2 border-dashed border-gray-200 rounded-lg p-4 mb-4"
      >
        {/* Draggable Items */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {items.map((item) => (
            <motion.div
              key={item.id}
              id={`item-${item.id}`}
              drag={!draggedItems[item.id]?.placed}
              dragMomentum={false}
              dragElastic={0.1}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              animate={{
                x: draggedItems[item.id]?.x || 0,
                y: draggedItems[item.id]?.y || 0,
                scale: draggedItems[item.id]?.placed ? 1.1 : 1,
              }}
              transition={{
                type: "spring",
                damping: draggedItems[item.id]?.placed ? 30 : 15,
                stiffness: draggedItems[item.id]?.placed ? 300 : 150,
              }}
              onDragEnd={(_, info) => handleDragEnd(item, info)}
              className={`w-16 h-16 flex items-center justify-center rounded-lg cursor-grab active:cursor-grabbing shadow-md ${
                draggedItems[item.id]?.placed ? "ring-2 ring-green-500" : "bg-white"
              }`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="absolute -bottom-6 text-xs font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Target Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {targets.map((target) => (
            <div
              key={target.id}
              id={`target-${target.id}`}
              className="p-4 rounded-lg flex flex-col items-center justify-center h-32"
              style={{ backgroundColor: `${target.color}20` /* 20% opacity */ }}
            >
              <div className="text-2xl mb-2">{target.emoji}</div>
              <div className="font-medium text-center">{target.label}</div>
            </div>
          ))}
        </div>

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 100 + 50,
                  y: Math.random() * 100 + 50,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -100 - Math.random() * 300],
                  opacity: [0, 1, 0],
                  scale: [0, 1 + Math.random(), 0],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random(),
                }}
              >
                <Star className="text-yellow-400 fill-yellow-400" size={10 + Math.random() * 20} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={resetGame} className="flex items-center gap-2">
          <RefreshCw size={16} />
          <span>Reset</span>
        </Button>

        {gameCompleted && (
          <div className="text-green-600 font-bold animate-pulse">Great job! You matched everything correctly! 🎉</div>
        )}
      </div>
    </div>
  )
}
