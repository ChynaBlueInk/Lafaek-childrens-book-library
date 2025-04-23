"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define question types
type Question = {
  question: string;
  words: string[];
  answer: string;
};

export default function WordRiverGame() {
  const [selectedAge, setSelectedAge] = useState("5-6");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [showCrocodile, setShowCrocodile] = useState(false);
  const [crocodilePosition, setCrocodilePosition] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [bubbleStyles, setBubbleStyles] = useState<{
    width: string;
    height: string;
    top: string;
    left: string;
    xMove: number;
    yMove: number;
    duration: number;
  }[]>([]);
  const [monkeyShake, setMonkeyShake] = useState(false);
  const [playSound, setPlaySound] = useState<HTMLAudioElement | null>(null);

  const RIVER_LENGTH = 5;

  useEffect(() => {
    generateQuestions(selectedAge);
  }, [selectedAge]);

  useEffect(() => {
    const styles = Array.from({ length: 15 }).map(() => ({
      width: `${Math.random() * 30 + 10}px`,
      height: `${Math.random() * 30 + 10}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      xMove: Math.random() * 20 - 10,
      yMove: Math.random() * 20 - 10,
      duration: Math.random() * 3 + 2,
    }));
    setBubbleStyles(styles);
  }, []);

  useEffect(() => {
    setPlaySound(new Audio("/sounds/splash.mp3"));
  }, []);

  const generateQuestions = (ageGroup: string) => {
    let questionPool: Question[] = [];
    switch (ageGroup) {
      case "5-6":
        questionPool = [
          { question: "Which word ends with 'ing'?", words: ["sing", "ball", "cat", "dog", "hat"], answer: "sing" },
          { question: "Find the word that starts with 'ch'", words: ["chair", "kite", "ball", "fish", "door"], answer: "chair" },
          { question: "Find the word with the 'oo' sound", words: ["book", "cat", "pen", "hat", "sun"], answer: "book" },
          { question: "Which word starts with 'sh'?", words: ["ship", "car", "ball", "kite", "dog"], answer: "ship" },
          { question: "Find the word that ends with 'at'", words: ["cat", "dog", "pig", "cow", "hen"], answer: "cat" },
        ];
        break;
    }
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, RIVER_LENGTH));
    setCurrentQuestionIndex(0);
    setPlayerPosition(0);
    setGameComplete(false);
    setAttemptCount(0);
    setTotalAttempts(0);
    setMonkeyShake(false);
  };

  const handleRockClick = (word: string, index: number) => {
    setAttemptCount((prev) => prev + 1);
    if (gameComplete) return;
    const current = questions[currentQuestionIndex];

    if (word === current.answer) {
      setMonkeyShake(false);
      setPlayerPosition((prev) => prev + 1);
      if (currentQuestionIndex === RIVER_LENGTH - 1) {
        setGameComplete(true);
        setTotalAttempts(attemptCount + 1);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      setShowCrocodile(true);
      setCrocodilePosition(index);
      if (playSound) playSound.play();
      setMonkeyShake(true);
      if (playerPosition > 0) {
        setPlayerPosition((prev) => prev - 1);
      }
      setTimeout(() => setShowCrocodile(false), 2000);
    }
  };

  const resetGame = () => {
    generateQuestions(selectedAge);
  };

  const currentQuestion = questions[currentQuestionIndex] || { question: "", words: [], answer: "" };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-b from-green-900 to-black text-white">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 font-comic">Word River Adventure</h1>

        <div className="mb-6 w-full max-w-xs">
          <Select value={selectedAge} onValueChange={setSelectedAge}>
            <SelectTrigger className="bg-white text-black border-2 border-green-700 rounded-full">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="5-6">Ages 5–6</SelectItem>
              <SelectItem value="7-8">Ages 7–8</SelectItem>
              <SelectItem value="9-10">Ages 9–10</SelectItem>
              <SelectItem value="11+">Ages 11+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 w-full max-w-xs flex justify-between items-center">
          <button
            onClick={resetGame}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full border-2 border-green-900"
          >
            Reset Game
          </button>
          <div className="bg-white px-4 py-2 rounded-full border-2 border-green-700">
            <span className="font-bold text-green-900">Attempts: {attemptCount}</span>
          </div>
        </div>

        <div className="w-full max-w-2xl mb-6 bg-white rounded-full h-4 border-2 border-green-700 overflow-hidden">
          <div
            className="bg-green-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${(playerPosition / RIVER_LENGTH) * 100}%` }}
          ></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="bg-white rounded-2xl p-6 mb-8 shadow-lg border-4 border-green-700 w-full max-w-2xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            key={currentQuestionIndex}
          >
            <h2 className="text-2xl text-center font-bold text-green-900">
              {currentQuestion.question}
            </h2>
          </motion.div>
        </AnimatePresence>

        <div className="relative w-full max-w-4xl h-80 bg-blue-300 rounded-lg overflow-hidden border-4 border-blue-500">
          <div className="absolute inset-0">
            {bubbleStyles.map((style, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-100 opacity-30 rounded-full"
                style={{ width: style.width, height: style.height, top: style.top, left: style.left }}
                animate={{ x: [0, style.xMove], y: [0, style.yMove] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: style.duration }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex justify-between items-center px-8">
            {Array.from({ length: RIVER_LENGTH + 1 }).map((_, index) => (
              <div key={index} className="relative">
                {index > 0 && index < RIVER_LENGTH + 1 && (
                  <motion.button
                    className="relative bg-stone-300 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-4 border-stone-400 hover:bg-stone-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (index - 1 === currentQuestionIndex) {
                        handleRockClick(currentQuestion.words[index - 1], index - 1);
                      }
                    }}
                    disabled={index - 1 !== currentQuestionIndex}
                  >
                    <span className="text-lg font-bold text-stone-800">
                      {index - 1 < questions.length ? currentQuestion.words[index - 1] : ""}
                    </span>
                  </motion.button>
                )}

                {playerPosition === index && (
                  <motion.div
                    className={`absolute -top-16 w-12 h-16 bg-yellow-400 rounded-full flex items-center justify-center ${monkeyShake ? 'animate-shake' : ''}`}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={`explorer-${index}`}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full absolute top-3 left-3" />
                      <div className="w-2 h-2 bg-black rounded-full absolute top-3 right-3" />
                      <div className="w-4 h-1 bg-black rounded-full absolute top-6" />
                    </div>
                    <div className="absolute -bottom-2 w-8 h-4 bg-green-500 rounded-full" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showCrocodile && (
              <motion.div
                className="absolute z-10"
                style={{ left: `${(crocodilePosition + 1) * (100 / (RIVER_LENGTH + 1))}%`, bottom: "0" }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <div className="relative">
                  <div className="w-32 h-16 bg-green-600 rounded-t-full flex items-start justify-center">
                    <div className="w-24 h-8 bg-green-500 rounded-t-full mt-2" />
                    <div className="absolute top-2 left-6 w-3 h-3 bg-black rounded-full" />
                    <div className="absolute top-2 right-6 w-3 h-3 bg-black rounded-full" />
                    <div className="absolute bottom-0 w-full flex justify-center">
                      <div className="w-20 h-6 bg-green-700 rounded-t-full flex items-start justify-around pt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-2 h-4 bg-white rounded-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
