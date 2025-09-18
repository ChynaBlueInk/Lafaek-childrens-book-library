// A brand new, fully working drag and drop game: Match animals to their homes
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { Star, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Animal {
  id: string;
  label: string;
  emoji: string;
  homeId: string;
}

interface Home {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export default function AnimalMatchingGame() {
  const animals: Animal[] = [
    { id: "bunny", label: "Bunny", emoji: "🐰", homeId: "burrow" },
    { id: "bee", label: "Bee", emoji: "🐝", homeId: "hive" },
    { id: "fish", label: "Fish", emoji: "🐟", homeId: "pond" },
  ];

  const homes: Home[] = [
    { id: "burrow", label: "Burrow", emoji: "🕳️", color: "#F4A261" },
    { id: "hive", label: "Hive", emoji: "🍯", color: "#E9C46A" },
    { id: "pond", label: "Pond", emoji: "🌊", color: "#2A9D8F" },
  ];

  const [positions, setPositions] = useState<{ [id: string]: { x: number; y: number; placed: boolean } }>({});
  const [matches, setMatches] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial: any = {};
    animals.forEach((a) => (initial[a.id] = { x: 0, y: 0, placed: false }));
    setPositions(initial);
    setMatches([]);
    setComplete(false);
  }, []);

  const handleDrop = (animal: Animal, info: PanInfo) => {
    if (!areaRef.current) return;
    const el = document.elementFromPoint(info.point.x, info.point.y);
    if (!el) return;

    const match = el.closest(`#home-${animal.homeId}`);
    if (match) {
      const matchRect = match.getBoundingClientRect();
      const areaRect = areaRef.current.getBoundingClientRect();
      setPositions((prev) => ({
        ...prev,
        [animal.id]: {
          x: matchRect.left - areaRect.left + matchRect.width / 2 - 48,
          y: matchRect.top - areaRect.top + matchRect.height / 2 - 48,
          placed: true,
        },
      }));
      if (!matches.includes(animal.id)) {
        const updated = [...matches, animal.id];
        setMatches(updated);
        if (updated.length === animals.length) {
          setComplete(true);
        }
      }
    } else {
      setPositions((prev) => ({
        ...prev,
        [animal.id]: { x: 0, y: 0, placed: false },
      }));
    }
  };

  const resetGame = () => {
    const initial: any = {};
    animals.forEach((a) => (initial[a.id] = { x: 0, y: 0, placed: false }));
    setPositions(initial);
    setMatches([]);
    setComplete(false);
  };

  return (
    <div className="min-h-screen bg-[#fefae0] text-black p-6">
      <h1 className="text-3xl font-bold text-center text-[#e76f51] mb-6">Match Animals to Their Homes!</h1>
      <div ref={areaRef} className="relative border border-dashed border-gray-400 rounded-xl p-6 bg-white">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {homes.map((home) => (
            <div
              key={home.id}
              id={`home-${home.id}`}
              className="p-4 rounded-lg text-center font-bold text-xl shadow-md"
              style={{ backgroundColor: `${home.color}66` }}
            >
              <div className="text-4xl mb-1">{home.emoji}</div>
              {home.label}
            </div>
          ))}
        </div>

        <div className="flex justify-center flex-wrap gap-6">
          {animals.map((a) => (
            <motion.div
              key={a.id}
              drag={!positions[a.id]?.placed}
              dragMomentum={false}
              whileDrag={{ scale: 1.1 }}
              animate={{
                x: positions[a.id]?.x || 0,
                y: positions[a.id]?.y || 0,
              }}
              onDragEnd={(_, info) => handleDrop(a, info)}
              className={`w-24 h-24 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center shadow-md text-4xl relative cursor-grab active:cursor-grabbing ${
                positions[a.id]?.placed ? "ring-4 ring-green-400" : ""
              }`}
            >
              {a.emoji}
              <div className="text-xs font-medium mt-1 text-gray-700">{a.label}</div>
              {positions[a.id]?.placed && (
                <CheckCircle2 className="absolute top-1 right-1 text-green-500" size={20} />
              )}
            </motion.div>
          ))}
        </div>

        {complete && (
          <div className="mt-6 text-center text-green-600 font-bold text-xl animate-pulse">
            🎉 All animals are home!
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600 text-white font-bold flex items-center gap-2">
          <RefreshCw size={16} />
          Reset Game
        </Button>
      </div>
    </div>
  );
}