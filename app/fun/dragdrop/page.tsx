"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, type PanInfo } from "framer-motion";
import { ArrowLeft, Star, RefreshCw, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DragDropPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/fun">
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-green-400">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-green-500">Drag & Drop Fun</h1>
          <div className="w-20" />
        </div>

        <Tabs defaultValue="animals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 border border-green-500 bg-gray-800">
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

          {/* You can duplicate above pattern for 'shapes' and 'food' tabs as needed */}
        </Tabs>
      </div>
    </div>
  );
}

interface Item {
  id: string;
  emoji: string;
  label: string;
  targetId: string;
}

interface Target {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

interface DragDropGameProps {
  gameType: string;
  items: Item[];
  targets: Target[];
  instructions: string;
}

function DragDropGame({ gameType, items, targets, instructions }: DragDropGameProps) {
  const [draggedItems, setDraggedItems] = useState<{ [key: string]: { x: number; y: number; placed: boolean } }>({});
  const [targetPositions, setTargetPositions] = useState<{
    [key: string]: { x: number; y: number; width: number; height: number };
  }>({});
  const [correctPlacements, setCorrectPlacements] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraggedItems({});
    setCorrectPlacements([]);
    setShowCelebration(false);
    setGameCompleted(false);

    const timer = setTimeout(() => {
      const newDraggedItems: any = {};
      items.forEach((item) => {
        newDraggedItems[item.id] = { x: 0, y: 0, placed: false };
      });
      setDraggedItems(newDraggedItems);

      const newTargetPositions: any = {};
      targets.forEach((target) => {
        const element = document.getElementById(`target-${target.id}`);
        if (element && containerRef.current) {
          const targetRect = element.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          newTargetPositions[target.id] = {
            x: targetRect.left - containerRect.left,
            y: targetRect.top - containerRect.top,
            width: targetRect.width,
            height: targetRect.height,
          };
        }
      });
      setTargetPositions(newTargetPositions);
    }, 500);

    return () => clearTimeout(timer);
  }, [gameType, items, targets]);

  const handleDragEnd = (item: Item, info: PanInfo) => {
    if (!containerRef.current) return;

    const { x, y } = info.point;
    const containerRect = containerRef.current.getBoundingClientRect();
    const relX = x - containerRect.left;
    const relY = y - containerRect.top;

    const target = targetPositions[item.targetId];
    if (target) {
      const buffer = 40;
      const hit =
        relX > target.x - buffer &&
        relX < target.x + target.width + buffer &&
        relY > target.y - buffer &&
        relY < target.y + target.height + buffer;

      if (hit) {
        setDraggedItems((prev) => ({
          ...prev,
          [item.id]: {
            x: target.x + target.width / 2 - 48,
            y: target.y + target.height / 2 - 48,
            placed: true,
          },
        }));

        if (!correctPlacements.includes(item.id)) {
          const newCorrect = [...correctPlacements, item.id];
          setCorrectPlacements(newCorrect);
          if (newCorrect.length === items.length) {
            setShowCelebration(true);
            setGameCompleted(true);
          }
        }

        return;
      }
    }

    setDraggedItems((prev) => ({
      ...prev,
      [item.id]: { x: 0, y: 0, placed: false },
    }));
  };

  const resetGame = () => {
    const resetItems: any = {};
    items.forEach((item) => {
      resetItems[item.id] = { x: 0, y: 0, placed: false };
    });
    setDraggedItems(resetItems);
    setCorrectPlacements([]);
    setShowCelebration(false);
    setGameCompleted(false);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 shadow-lg border border-green-500">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-green-400">{instructions}</h2>
      </div>

      <div
        ref={containerRef}
        className="relative min-h-[500px] border-2 border-dashed border-gray-500 rounded-lg p-6 bg-gray-800"
      >
        {/* Draggable Items */}
        <div className="flex flex-wrap gap-6 justify-center mb-10">
          {items.map((item) => (
            <motion.div
              key={item.id}
              id={`item-${item.id}`}
              drag={!draggedItems[item.id]?.placed}
              dragMomentum={false}
              whileDrag={{ scale: 1.15 }}
              animate={{
                x: draggedItems[item.id]?.x || 0,
                y: draggedItems[item.id]?.y || 0,
                scale: draggedItems[item.id]?.placed ? 1.1 : 1,
              }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onDragEnd={(_, info) => handleDragEnd(item, info)}
              className={`w-24 h-24 bg-white text-black text-5xl rounded-xl flex flex-col items-center justify-center shadow-md relative cursor-grab active:cursor-grabbing ${
                draggedItems[item.id]?.placed ? "ring-4 ring-green-400" : ""
              }`}
            >
              {item.emoji}
              {draggedItems[item.id]?.placed && (
                <CheckCircle2 className="absolute top-1 right-1 text-green-500" size={20} />
              )}
              <span className="text-xs font-semibold mt-2 text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Targets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {targets.map((target) => (
            <div
              key={target.id}
              id={`target-${target.id}`}
              className="p-4 h-36 rounded-xl flex flex-col items-center justify-center text-black font-bold"
              style={{ backgroundColor: `${target.color}33` }}
            >
              <div className="text-3xl">{target.emoji}</div>
              <div className="text-lg">{target.label}</div>
            </div>
          ))}
        </div>

        {/* Stars Celebration */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 500,
                  y: Math.random() * 300,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -200 - Math.random() * 200],
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  delay: Math.random(),
                }}
              >
                <Star className="text-yellow-400 fill-yellow-400" size={20 + Math.random() * 20} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={resetGame} className="flex items-center gap-2">
          <RefreshCw size={16} />
          <span>Reset</span>
        </Button>

        {gameCompleted && (
          <div className="text-green-400 font-bold animate-pulse">
            🎉 Great job! Everything matched perfectly!
          </div>
        )}
      </div>
    </div>
  );
}
