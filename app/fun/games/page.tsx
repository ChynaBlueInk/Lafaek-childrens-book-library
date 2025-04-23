"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GamesPage() {
  const [cards, setCards] = useState<
    Array<{ id: number; value: string; flipped: boolean; matched: boolean }>
  >([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  // Initialize cards
  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex].value === cards[secondIndex].value) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstIndex || card.id === secondIndex
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstIndex || card.id === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
        return () => clearTimeout(timer);
      }

      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedPairs === 6) {
      setGameComplete(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].flipped ||
      cards[index].matched
    )
      return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === index ? { ...card, flipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
  };

  const resetGame = () => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"];
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/fun">
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-green-400">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-green-500">Memory Game</h1>
          <div className="w-20" />
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-lg mb-6 border border-green-500">
          <div className="flex justify-between items-center mb-4 text-green-300 font-medium">
            <div>Moves: {moves}</div>
            <div>Pairs: {matchedPairs}/6</div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(index)}
              >
                <Card className={`h-20 sm:h-24 cursor-pointer rounded-xl border border-white ${card.matched ? "bg-green-700" : "bg-gray-900"}`}>
                  <CardContent className="flex items-center justify-center h-full p-0">
                    {card.flipped || card.matched ? (
                      <motion.div
                        initial={{ rotateY: 180, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        className="text-4xl"
                      >
                        {card.value}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 180 }}
                        className="w-full h-full flex items-center justify-center rounded-xl bg-gray-700"
                      >
                        <Star className="text-green-400" size={24} />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {gameComplete && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-900 rounded-xl p-6 shadow-lg text-center border border-green-500"
          >
            <h2 className="text-2xl font-bold text-white mb-2">🎉 Congratulations!</h2>
            <p className="text-lg mb-4">You finished the game in {moves} moves!</p>
            <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600 text-black font-bold">
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
