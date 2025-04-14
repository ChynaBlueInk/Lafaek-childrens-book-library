"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GamesPage() {
  const [cards, setCards] = useState<Array<{ id: number; value: string; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameComplete, setGameComplete] = useState<boolean>(false)

  // Initialize the memory game
  useEffect(() => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"]
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))

    setCards(gameCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
  }, [])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards

      if (cards[firstIndex].value === cards[secondIndex].value) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstIndex || card.id === secondIndex ? { ...card, matched: true } : card,
          ),
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
      } else {
        // No match, flip cards back after a delay
        const timer = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstIndex || card.id === secondIndex ? { ...card, flipped: false } : card,
            ),
          )
          setFlippedCards([])
        }, 1000)

        return () => clearTimeout(timer)
      }

      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs === 6) {
      setGameComplete(true)
    }
  }, [matchedPairs])

  const handleCardClick = (index: number) => {
    // Prevent clicking if already two cards are flipped or card is already flipped/matched
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) {
      return
    }

    // Flip the card
    setCards((prevCards) => prevCards.map((card) => (card.id === index ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, index])
  }

  const resetGame = () => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"]
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))

    setCards(gameCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-red-600">Memory Game</h1>
          <div className="w-20" />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Moves: {moves}</div>
            <div className="text-lg font-medium">Pairs: {matchedPairs}/6</div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(index)}
              >
                <Card className={`h-20 sm:h-24 cursor-pointer ${card.matched ? "bg-green-100" : ""}`}>
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
                        className="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 rounded-md flex items-center justify-center"
                      >
                        <Star className="text-white" size={24} />
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
            className="bg-yellow-100 rounded-xl p-6 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Congratulations!</h2>
            <p className="text-lg mb-4">You completed the game in {moves} moves!</p>
            <Button onClick={resetGame} className="bg-yellow-500 hover:bg-yellow-600">
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
