"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [volume, setVolume] = useState(50)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const songs = [
    { id: 1, title: "Happy Tune", artist: "Kids Music", color: "#FFD166", emoji: "🎵" },
    { id: 2, title: "Animal Sounds", artist: "Nature Kids", color: "#4ECDC4", emoji: "🐘" },
    { id: 3, title: "Sleepy Lullaby", artist: "Bedtime Songs", color: "#9D65C9", emoji: "🌙" },
    { id: 4, title: "Dance Party", artist: "Fun Beats", color: "#FF6B6B", emoji: "💃" },
  ]

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio()

    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Handle song changes
  useEffect(() => {
    if (!audioRef.current) return

    // In a real app, we would set the actual audio source
    // audioRef.current.src = songs[currentSong].url

    // For this demo, we'll just simulate playing
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Audio play error:", e))
    }

    setProgress(0)
  }, [currentSong])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Audio play error:", e))
      startProgressAnimation()
    } else {
      audioRef.current.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [volume])

  const startProgressAnimation = () => {
    if (!audioRef.current) return

    // For demo purposes, we'll simulate progress
    // In a real app, we would use audioRef.current.currentTime / audioRef.current.duration
    const animate = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + 0.05
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSong((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-yellow-600">Music Fun</h1>
          <div className="w-20" />
        </div>

        <Card className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-8">
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                  rotate: isPlaying ? 360 : 0,
                }}
                transition={{
                  duration: 4,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
                className="w-40 h-40 rounded-full flex items-center justify-center text-6xl"
                style={{ backgroundColor: songs[currentSong].color }}
              >
                {songs[currentSong].emoji}
              </motion.div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">{songs[currentSong].title}</h2>
              <p className="text-gray-500">{songs[currentSong].artist}</p>
            </div>

            <div className="mb-6">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="cursor-pointer"
                onValueChange={(value) => {
                  setProgress(value[0])
                  // In a real app, we would set audioRef.current.currentTime
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <div>
                  {Math.floor((progress / 100) * 60)}:
                  {String(Math.floor(((progress / 100) * 60) % 60)).padStart(2, "0")}
                </div>
                <div>1:00</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12" onClick={handlePrevious}>
                <SkipBack size={24} />
              </Button>

              <Button
                variant="default"
                size="icon"
                className="rounded-full w-16 h-16"
                style={{ backgroundColor: songs[currentSong].color }}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12" onClick={handleNext}>
                <SkipForward size={24} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Volume2 size={20} />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="cursor-pointer"
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
