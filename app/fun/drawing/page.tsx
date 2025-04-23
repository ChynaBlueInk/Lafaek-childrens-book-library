import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";

export default function PaintByNumbers() {
  const paintImages: {
    id: string;
    name: string;
    width: number;
    height: number;
    colorMap: Record<number, string>;
  }[] = [
    {
      id: "rocket",
      name: "Space Rocket",
      width: 400,
      height: 400,
      colorMap: {
        1: "#FF6B6B",
        2: "#4ECDC4",
        3: "#FFD166",
        4: "#9D65C9",
        5: "#1A535C",
      },
    },
    {
      id: "dinosaur",
      name: "Friendly Dinosaur",
      width: 400,
      height: 400,
      colorMap: {
        1: "#66BB6A",
        2: "#FFA726",
        3: "#42A5F5",
        4: "#EF5350",
        5: "#8D6E63",
      },
    },
    {
      id: "underwater",
      name: "Underwater Adventure",
      width: 400,
      height: 400,
      colorMap: {
        1: "#29B6F6",
        2: "#FF8A65",
        3: "#FFD54F",
        4: "#9575CD",
        5: "#4DB6AC",
        6: "#BCAAA4",
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [coloredRegions, setColoredRegions] = useState<Record<string, Record<number, string>>>({});
  const [completedImages, setCompletedImages] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentImage = paintImages[currentIndex];

  useEffect(() => {
    if (!coloredRegions[currentImage.id]) {
      setColoredRegions((prev) => ({
        ...prev,
        [currentImage.id]: {},
      }));
    }
    setMessage("");
    setShowCelebration(false);
  }, [currentIndex]);

  const checkCompletion = () => {
    const regions = coloredRegions[currentImage.id] || {};
    const map = currentImage.colorMap;
    const expected = Object.keys(map).length;
    const filled = Object.keys(regions).length;

    if (filled === expected) {
      let correct = true;
      for (const regionId in regions) {
        const expectedColor = map[Number(regionId)];
        const userColor = regions[Number(regionId)];
        if (expectedColor !== userColor) {
          correct = false;
          break;
        }
      }

      if (correct) {
        setMessage("🎉 Perfect! You matched all the colors!");
        setCompletedImages((prev) => ({ ...prev, [currentImage.id]: true }));
        setShowCelebration(true);
      } else {
        setMessage("⚠️ Some colors are incorrect. Try again!");
      }
    }
  };

  const resetImage = () => {
    setColoredRegions((prev) => ({ ...prev, [currentImage.id]: {} }));
    setMessage("");
    setShowCelebration(false);
  };

  const handleCanvasClick = (regionId: number) => {
    if (!selectedColor || selectedNumber === null) return;

    setColoredRegions((prev) => ({
      ...prev,
      [currentImage.id]: {
        ...prev[currentImage.id],
        [regionId]: selectedColor,
      },
    }));

    checkCompletion();
  };

  const handleColorSelect = (color: string, number: number) => {
    setSelectedColor(color);
    setSelectedNumber(number);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 shadow-lg border border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-400">{currentImage.name}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentIndex((currentIndex - 1 + paintImages.length) % paintImages.length)}>Prev</Button>
          <Button variant="outline" onClick={() => setCurrentIndex((currentIndex + 1) % paintImages.length)}>Next</Button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-4">
        <canvas
          ref={canvasRef}
          className="border border-gray-500 rounded-md bg-white"
          width={currentImage.width}
          height={currentImage.height}
          onClick={() => handleCanvasClick(Math.floor(Math.random() * Object.keys(currentImage.colorMap).length) + 1)} // placeholder
        />
        {message && (
          <div className={`mt-4 p-2 rounded text-center w-full font-medium ${
            message.includes("Perfect") ? "bg-green-600" : "bg-yellow-500 text-black"
          }`}>
            {message}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">Color Palette</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(currentImage.colorMap).map(([num, color]) => (
          <motion.div
            key={num}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorSelect(color, Number(num))}
            className={`w-12 h-12 rounded-md cursor-pointer flex items-center justify-center ${
              selectedColor === color ? "ring-2 ring-green-400" : ""
            }`}
            style={{ backgroundColor: color }}
          >
            <span className="font-bold text-white">{num}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={resetImage}>Reset</Button>
        <Button onClick={checkCompletion} className="flex items-center gap-2">
          <Check size={16} />
          <span>Check</span>
        </Button>
      </div>

      {showCelebration && (
        <div className="relative mt-8 h-32 w-full pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 400,
                y: Math.random() * 100 + 50,
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
  );
}
