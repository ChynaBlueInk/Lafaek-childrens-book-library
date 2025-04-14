"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Eraser, Trash2, Palette, Edit, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DrawingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-purple-600">Drawing Fun</h1>
          <div className="w-20" />
        </div>

        <Tabs defaultValue="drawing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="drawing" className="flex items-center gap-2">
              <Edit size={16} />
              <span>Free Drawing</span>
            </TabsTrigger>
            <TabsTrigger value="paint-by-numbers" className="flex items-center gap-2">
              <Palette size={16} />
              <span>Paint by Numbers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drawing">
            <FreeDrawing />
          </TabsContent>

          <TabsContent value="paint-by-numbers">
            <PaintByNumbers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FreeDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)
  const [mode, setMode] = useState<"draw" | "erase">("draw")

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      // Fill with white background
      context.fillStyle = "#ffffff"
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    setCtx(context)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return

    setIsDrawing(true)

    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.beginPath()
    ctx.moveTo(x, y)

    // Set drawing styles
    if (mode === "draw") {
      ctx.strokeStyle = color
    } else {
      ctx.strokeStyle = "#ffffff"
    }

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return

    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!ctx) return

    setIsDrawing(false)
    ctx.closePath()
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const downloadDrawing = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = "my-drawing.png"
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  const colors = ["#000000", "#FF6B6B", "#4ECDC4", "#FFD166", "#9D65C9", "#1A535C", "#F76C6C", "#0E9AA7"]

  return (
    <>
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <CardContent className="p-2 h-[400px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full border border-gray-200 rounded-lg cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </CardContent>
      </Card>

      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-3 mb-4">
          {colors.map((c) => (
            <motion.div
              key={c}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setColor(c)
                setMode("draw")
              }}
              className={`w-8 h-8 rounded-full cursor-pointer ${
                color === c && mode === "draw" ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="text-sm font-medium mr-2">Brush Size:</div>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="w-32"
          />
          <div className="text-sm">{brushSize}px</div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={mode === "erase" ? "default" : "outline"}
            onClick={() => setMode("erase")}
            className="flex items-center gap-2"
          >
            <Eraser size={16} />
            <span>Eraser</span>
          </Button>

          <Button variant="outline" onClick={clearCanvas} className="flex items-center gap-2">
            <Trash2 size={16} />
            <span>Clear</span>
          </Button>

          <Button onClick={downloadDrawing} className="flex items-center gap-2 ml-auto">
            <Download size={16} />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </>
  )
}

function PaintByNumbers() {
  // Define the paint-by-numbers images
  const paintImages = [
    {
      id: "rocket",
      name: "Space Rocket",
      width: 400,
      height: 400,
      colorMap: {
        1: "#FF6B6B", // red for rocket body
        2: "#4ECDC4", // teal for windows
        3: "#FFD166", // yellow for flames
        4: "#9D65C9", // purple for details
        5: "#1A535C", // dark teal for background elements
      },
    },
    {
      id: "dinosaur",
      name: "Friendly Dinosaur",
      width: 400,
      height: 400,
      colorMap: {
        1: "#66BB6A", // green for body
        2: "#FFA726", // orange for spikes
        3: "#42A5F5", // blue for details
        4: "#EF5350", // red for tongue
        5: "#8D6E63", // brown for ground
      },
    },
    {
      id: "underwater",
      name: "Underwater Adventure",
      width: 400,
      height: 400,
      colorMap: {
        1: "#29B6F6", // light blue for water
        2: "#FF8A65", // coral for fish
        3: "#FFD54F", // yellow for fish
        4: "#9575CD", // purple for jellyfish
        5: "#4DB6AC", // teal for seaweed
        6: "#BCAAA4", // tan for sand
      },
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [coloredRegions, setColoredRegions] = useState<{ [key: string]: { [key: number]: string } }>({
    rocket: {},
    dinosaur: {},
    underwater: {},
  })
  const [completedImages, setCompletedImages] = useState<{ [key: string]: boolean }>({
    rocket: false,
    dinosaur: false,
    underwater: false,
  })
  const [showCelebration, setShowCelebration] = useState(false)
  const [message, setMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const currentImage = paintImages[currentImageIndex]
  const currentImageId = currentImage.id

  // Initialize canvas and load image data
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    canvas.width = currentImage.width
    canvas.height = currentImage.height
    setCtx(context)

    // Draw the outline image
    drawOutlineImage(context)

    // Clear any message when changing images
    setMessage("")
    setShowCelebration(false)

    return () => {
      // Cleanup
    }
  }, [currentImageIndex])

  // Draw the outline image with numbers
  const drawOutlineImage = (context: CanvasRenderingContext2D) => {
    // Clear canvas with white background
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, currentImage.width, currentImage.height)

    // Draw the specific image outline based on the current image
    if (currentImageId === "rocket") {
      drawRocketOutline(context)
    } else if (currentImageId === "dinosaur") {
      drawDinosaurOutline(context)
    } else if (currentImageId === "underwater") {
      drawUnderwaterOutline(context)
    }

    // Apply any previously colored regions
    applyColoredRegions(context)
  }

  // Apply previously colored regions
  const applyColoredRegions = (context: CanvasRenderingContext2D) => {
    const regions = coloredRegions[currentImageId]
    for (const regionId in regions) {
      const color = regions[Number(regionId)]
      fillRegion(context, Number(regionId), color, false)
    }
  }

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current || !selectedColor || selectedNumber === null) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Get pixel color to identify region
    const imageData = ctx.getImageData(x, y, 1, 1).data
    // Convert to hex for comparison (we'll use this for region detection)
    const clickedColor = `#${imageData[0].toString(16).padStart(2, "0")}${imageData[1]
      .toString(16)
      .padStart(2, "0")}${imageData[2].toString(16).padStart(2, "0")}`.toUpperCase()

    // Determine which region was clicked based on the current image
    let regionId: number | null = null

    if (currentImageId === "rocket") {
      regionId = getRocketRegionFromColor(clickedColor)
    } else if (currentImageId === "dinosaur") {
      regionId = getDinosaurRegionFromColor(clickedColor)
    } else if (currentImageId === "underwater") {
      regionId = getUnderwaterRegionFromColor(clickedColor)
    }

    if (regionId !== null) {
      // Update the colored regions state
      setColoredRegions((prev) => ({
        ...prev,
        [currentImageId]: {
          ...prev[currentImageId],
          [regionId as number]: selectedColor,
        },
      }))

      // Fill the region with the selected color
      fillRegion(ctx, regionId, selectedColor)

      // Check if the image is complete
      checkImageCompletion()
    }
  }

  // Fill a region with color
  const fillRegion = (context: CanvasRenderingContext2D, regionId: number, color: string, redrawNumbers = true) => {
    // Save context state
    context.save()

    if (currentImageId === "rocket") {
      fillRocketRegion(context, regionId, color)
    } else if (currentImageId === "dinosaur") {
      fillDinosaurRegion(context, regionId, color)
    } else if (currentImageId === "underwater") {
      fillUnderwaterRegion(context, regionId, color)
    }

    // Restore context state
    context.restore()

    // Redraw the region numbers if needed
    if (redrawNumbers) {
      if (currentImageId === "rocket") {
        drawRocketNumbers(context)
      } else if (currentImageId === "dinosaur") {
        drawDinosaurNumbers(context)
      } else if (currentImageId === "underwater") {
        drawUnderwaterNumbers(context)
      }
    }
  }

  // Check if the image is complete
  const checkImageCompletion = () => {
    const regions = coloredRegions[currentImageId]
    const colorMap = currentImage.colorMap

    // Get the expected number of regions for the current image
    let expectedRegionCount = 0
    if (currentImageId === "rocket") expectedRegionCount = 5
    else if (currentImageId === "dinosaur") expectedRegionCount = 5
    else if (currentImageId === "underwater") expectedRegionCount = 6

    // Check if all regions are colored
    const allRegionsColored = Object.keys(regions).length === expectedRegionCount

    if (allRegionsColored) {
      // Check if all regions have the correct color
      let allCorrect = true
      for (const regionId in regions) {
        const expectedColor = colorMap[Number(regionId)]
        if (regions[Number(regionId)] !== expectedColor) {
          allCorrect = false
          break
        }
      }

      if (allCorrect) {
        setMessage("Amazing job! You colored it perfectly! 🎉")
        setCompletedImages((prev) => ({
          ...prev,
          [currentImageId]: true,
        }))
        setShowCelebration(true)
      } else {
        setMessage("Almost there! Some colors don't match the numbers. Try again!")
      }
    }
  }

  // Reset the current image
  const resetImage = () => {
    setColoredRegions((prev) => ({
      ...prev,
      [currentImageId]: {},
    }))
    setMessage("")
    setShowCelebration(false)

    if (ctx) {
      drawOutlineImage(ctx)
    }
  }

  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % paintImages.length)
  }

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + paintImages.length) % paintImages.length)
  }

  // Create a color palette with numbers
  const colorPalette = Object.entries(currentImage.colorMap).map(([number, color]) => ({
    number: Number(number),
    color,
  }))

  // ===== ROCKET IMAGE FUNCTIONS =====

  function drawRocketOutline(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000000"

    // Region 1: Rocket Body (Red)
    ctx.beginPath()
    ctx.moveTo(200, 50)
    ctx.lineTo(150, 250)
    ctx.lineTo(250, 250)
    ctx.closePath()
    ctx.stroke()

    // Region 2: Windows (Teal)
    ctx.beginPath()
    ctx.arc(200, 150, 20, 0, Math.PI * 2)
    ctx.stroke()

    // Region 3: Flames (Yellow)
    ctx.beginPath()
    ctx.moveTo(170, 250)
    ctx.lineTo(150, 300)
    ctx.lineTo(200, 270)
    ctx.lineTo(250, 300)
    ctx.lineTo(230, 250)
    ctx.closePath()
    ctx.stroke()

    // Region 4: Fins (Purple)
    ctx.beginPath()
    ctx.moveTo(150, 250)
    ctx.lineTo(100, 250)
    ctx.lineTo(150, 200)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(250, 250)
    ctx.lineTo(300, 250)
    ctx.lineTo(250, 200)
    ctx.closePath()
    ctx.stroke()

    // Region 5: Stars (Dark Teal)
    drawStar(ctx, 100, 100, 5, 10, 5)
    drawStar(ctx, 300, 100, 5, 10, 5)
    drawStar(ctx, 150, 50, 5, 10, 5)
    drawStar(ctx, 250, 50, 5, 10, 5)

    // Draw numbers
    drawRocketNumbers(ctx)
  }

  function drawRocketNumbers(ctx: CanvasRenderingContext2D) {
    ctx.font = "bold 16px Arial"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Place numbers in each region
    ctx.fillText("1", 200, 150) // Rocket body
    ctx.fillText("2", 200, 150) // Window
    ctx.fillText("3", 200, 280) // Flames
    ctx.fillText("4", 125, 230) // Left fin
    ctx.fillText("4", 275, 230) // Right fin
    ctx.fillText("5", 100, 100) // Star
  }

  function getRocketRegionFromColor(color: string): number | null {
    // In a real implementation, we would use flood fill to detect regions
    // For this demo, we'll use a simplified approach based on coordinates
    return null // Placeholder
  }

  function fillRocketRegion(ctx: CanvasRenderingContext2D, regionId: number, color: string) {
    ctx.fillStyle = color

    switch (regionId) {
      case 1: // Rocket body
        ctx.beginPath()
        ctx.moveTo(200, 50)
        ctx.lineTo(150, 250)
        ctx.lineTo(250, 250)
        ctx.closePath()
        ctx.fill()
        break
      case 2: // Window
        ctx.beginPath()
        ctx.arc(200, 150, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      case 3: // Flames
        ctx.beginPath()
        ctx.moveTo(170, 250)
        ctx.lineTo(150, 300)
        ctx.lineTo(200, 270)
        ctx.lineTo(250, 300)
        ctx.lineTo(230, 250)
        ctx.closePath()
        ctx.fill()
        break
      case 4: // Fins
        ctx.beginPath()
        ctx.moveTo(150, 250)
        ctx.lineTo(100, 250)
        ctx.lineTo(150, 200)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(250, 250)
        ctx.lineTo(300, 250)
        ctx.lineTo(250, 200)
        ctx.closePath()
        ctx.fill()
        break
      case 5: // Stars
        ctx.fillStyle = color
        drawStar(ctx, 100, 100, 5, 10, 5, true)
        drawStar(ctx, 300, 100, 5, 10, 5, true)
        drawStar(ctx, 150, 50, 5, 10, 5, true)
        drawStar(ctx, 250, 50, 5, 10, 5, true)
        break
    }
  }

  // ===== DINOSAUR IMAGE FUNCTIONS =====

  function drawDinosaurOutline(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000000"

    // Region 1: Body (Green)
    ctx.beginPath()
    ctx.ellipse(200, 200, 80, 50, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Region 2: Spikes (Orange)
    ctx.beginPath()
    ctx.moveTo(160, 150)
    ctx.lineTo(180, 130)
    ctx.lineTo(200, 150)
    ctx.lineTo(220, 130)
    ctx.lineTo(240, 150)
    ctx.stroke()

    // Region 3: Head (Blue)
    ctx.beginPath()
    ctx.ellipse(280, 180, 30, 20, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Region 4: Tongue (Red)
    ctx.beginPath()
    ctx.moveTo(310, 180)
    ctx.quadraticCurveTo(320, 170, 330, 180)
    ctx.stroke()

    // Region 5: Ground (Brown)
    ctx.beginPath()
    ctx.moveTo(50, 250)
    ctx.lineTo(350, 250)
    ctx.lineTo(350, 300)
    ctx.lineTo(50, 300)
    ctx.closePath()
    ctx.stroke()

    // Draw numbers
    drawDinosaurNumbers(ctx)
  }

  function drawDinosaurNumbers(ctx: CanvasRenderingContext2D) {
    ctx.font = "bold 16px Arial"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Place numbers in each region
    ctx.fillText("1", 200, 200) // Body
    ctx.fillText("2", 200, 140) // Spikes
    ctx.fillText("3", 280, 180) // Head
    ctx.fillText("4", 320, 180) // Tongue
    ctx.fillText("5", 200, 275) // Ground
  }

  function getDinosaurRegionFromColor(color: string): number | null {
    // Simplified region detection
    return null // Placeholder
  }

  function fillDinosaurRegion(ctx: CanvasRenderingContext2D, regionId: number, color: string) {
    ctx.fillStyle = color

    switch (regionId) {
      case 1: // Body
        ctx.beginPath()
        ctx.ellipse(200, 200, 80, 50, 0, 0, Math.PI * 2)
        ctx.fill()
        break
      case 2: // Spikes
        ctx.beginPath()
        ctx.moveTo(160, 150)
        ctx.lineTo(180, 130)
        ctx.lineTo(200, 150)
        ctx.lineTo(220, 130)
        ctx.lineTo(240, 150)
        ctx.closePath()
        ctx.fill()
        break
      case 3: // Head
        ctx.beginPath()
        ctx.ellipse(280, 180, 30, 20, 0, 0, Math.PI * 2)
        ctx.fill()
        break
      case 4: // Tongue
        ctx.beginPath()
        ctx.moveTo(310, 180)
        ctx.quadraticCurveTo(320, 170, 330, 180)
        ctx.quadraticCurveTo(320, 190, 310, 180)
        ctx.closePath()
        ctx.fill()
        break
      case 5: // Ground
        ctx.beginPath()
        ctx.moveTo(50, 250)
        ctx.lineTo(350, 250)
        ctx.lineTo(350, 300)
        ctx.lineTo(50, 300)
        ctx.closePath()
        ctx.fill()
        break
    }
  }

  // ===== UNDERWATER IMAGE FUNCTIONS =====

  function drawUnderwaterOutline(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000000"

    // Region 1: Water (Light Blue)
    ctx.beginPath()
    ctx.rect(50, 50, 300, 200)
    ctx.stroke()

    // Region 2: Orange Fish
    ctx.beginPath()
    ctx.moveTo(150, 100)
    ctx.lineTo(180, 120)
    ctx.lineTo(150, 140)
    ctx.closePath()
    ctx.stroke()

    // Region 3: Yellow Fish
    ctx.beginPath()
    ctx.moveTo(250, 150)
    ctx.lineTo(280, 170)
    ctx.lineTo(250, 190)
    ctx.closePath()
    ctx.stroke()

    // Region 4: Purple Jellyfish
    ctx.beginPath()
    ctx.arc(200, 100, 20, 0, Math.PI)
    ctx.moveTo(180, 100)
    ctx.lineTo(180, 120)
    ctx.moveTo(190, 100)
    ctx.lineTo(190, 125)
    ctx.moveTo(200, 100)
    ctx.lineTo(200, 130)
    ctx.moveTo(210, 100)
    ctx.lineTo(210, 125)
    ctx.moveTo(220, 100)
    ctx.lineTo(220, 120)
    ctx.stroke()

    // Region 5: Seaweed (Teal)
    ctx.beginPath()
    ctx.moveTo(100, 250)
    ctx.quadraticCurveTo(110, 230, 100, 210)
    ctx.quadraticCurveTo(90, 190, 100, 170)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(120, 250)
    ctx.quadraticCurveTo(130, 230, 120, 210)
    ctx.quadraticCurveTo(110, 190, 120, 170)
    ctx.stroke()

    // Region 6: Sand (Tan)
    ctx.beginPath()
    ctx.moveTo(50, 250)
    ctx.lineTo(350, 250)
    ctx.lineTo(350, 300)
    ctx.lineTo(50, 300)
    ctx.closePath()
    ctx.stroke()

    // Draw numbers
    drawUnderwaterNumbers(ctx)
  }

  function drawUnderwaterNumbers(ctx: CanvasRenderingContext2D) {
    ctx.font = "bold 16px Arial"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Place numbers in each region
    ctx.fillText("1", 200, 150) // Water
    ctx.fillText("2", 160, 120) // Orange fish
    ctx.fillText("3", 260, 170) // Yellow fish
    ctx.fillText("4", 200, 90) // Jellyfish
    ctx.fillText("5", 110, 200) // Seaweed
    ctx.fillText("6", 200, 275) // Sand
  }

  function getUnderwaterRegionFromColor(color: string): number | null {
    // Simplified region detection
    return null // Placeholder
  }

  function fillUnderwaterRegion(ctx: CanvasRenderingContext2D, regionId: number, color: string) {
    ctx.fillStyle = color

    switch (regionId) {
      case 1: // Water
        ctx.beginPath()
        ctx.rect(50, 50, 300, 200)
        ctx.fill()
        break
      case 2: // Orange fish
        ctx.beginPath()
        ctx.moveTo(150, 100)
        ctx.lineTo(180, 120)
        ctx.lineTo(150, 140)
        ctx.closePath()
        ctx.fill()
        break
      case 3: // Yellow fish
        ctx.beginPath()
        ctx.moveTo(250, 150)
        ctx.lineTo(280, 170)
        ctx.lineTo(250, 190)
        ctx.closePath()
        ctx.fill()
        break
      case 4: // Jellyfish
        ctx.beginPath()
        ctx.arc(200, 100, 20, 0, Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(180, 100)
        ctx.lineTo(180, 120)
        ctx.moveTo(190, 100)
        ctx.lineTo(190, 125)
        ctx.moveTo(200, 100)
        ctx.lineTo(200, 130)
        ctx.moveTo(210, 100)
        ctx.lineTo(210, 125)
        ctx.moveTo(220, 100)
        ctx.lineTo(220, 120)
        ctx.stroke()
        break
      case 5: // Seaweed
        ctx.beginPath()
        ctx.moveTo(100, 250)
        ctx.quadraticCurveTo(110, 230, 100, 210)
        ctx.quadraticCurveTo(90, 190, 100, 170)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(120, 250)
        ctx.quadraticCurveTo(130, 230, 120, 210)
        ctx.quadraticCurveTo(110, 190, 120, 170)
        ctx.stroke()
        ctx.lineWidth = 5
        ctx.strokeStyle = color
        ctx.stroke()
        break
      case 6: // Sand
        ctx.beginPath()
        ctx.moveTo(50, 250)
        ctx.lineTo(350, 250)
        ctx.lineTo(350, 300)
        ctx.lineTo(50, 300)
        ctx.closePath()
        ctx.fill()
        break
    }
  }

  // Helper function to draw a star
  function drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    fill = false,
  ) {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }

    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()

    if (fill) {
      ctx.fill()
    } else {
      ctx.stroke()
    }
  }

  // Function to handle color selection
  const handleColorSelect = (color: string, number: number) => {
    setSelectedColor(color)
    setSelectedNumber(number)
  }

  // Function to auto-fill with correct colors (hint feature)
  const autoFillHint = () => {
    if (!ctx) return

    // Fill one random unfilled region with the correct color
    const colorMap = currentImage.colorMap
    const regions = coloredRegions[currentImageId]

    // Find unfilled regions
    const unfilledRegions: number[] = []
    for (const regionId in colorMap) {
      if (!regions[Number(regionId)]) {
        unfilledRegions.push(Number(regionId))
      }
    }

    if (unfilledRegions.length > 0) {
      // Pick a random unfilled region
      const randomIndex = Math.floor(Math.random() * unfilledRegions.length)
      const regionId = unfilledRegions[randomIndex]
      const correctColor = colorMap[regionId]

      // Fill the region
      fillRegion(ctx, regionId, correctColor)

      // Update state
      setColoredRegions((prev) => ({
        ...prev,
        [currentImageId]: {
          ...prev[currentImageId],
          [regionId]: correctColor,
        },
      }))

      setMessage("Here's a hint! I filled in one region for you.")

      // Check if the image is now complete
      checkImageCompletion()
    } else {
      setMessage("All regions are already filled!")
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={prevImage} className="flex items-center gap-2">
            Previous
          </Button>
          <h2 className="text-xl font-bold">{currentImage.name}</h2>
          <Button variant="outline" onClick={nextImage} className="flex items-center gap-2">
            Next
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-200 rounded-lg cursor-pointer mb-4"
              onClick={handleCanvasClick}
              width={currentImage.width}
              height={currentImage.height}
            />

            {showCelebration && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: Math.random() * currentImage.width,
                      y: Math.random() * currentImage.height,
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{
                      y: [null, -100 - Math.random() * 100],
                      opacity: [1, 0],
                      scale: [0, 1 + Math.random()],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded-md mb-4 text-center ${
                message.includes("perfectly") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {message}
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-lg">
        <h3 className="font-bold mb-3">Color Palette</h3>
        <p className="text-sm mb-3">Click a color, then click a numbered area to fill it in!</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {colorPalette.map((item) => (
            <motion.div
              key={item.color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleColorSelect(item.color, item.number)}
              className={`w-12 h-12 rounded-md cursor-pointer flex items-center justify-center ${
                selectedColor === item.color ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
              style={{ backgroundColor: item.color }}
            >
              <span className="font-bold text-white text-shadow">{item.number}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={resetImage}>
            Reset
          </Button>

          <Button variant="outline" onClick={autoFillHint} className="flex items-center gap-2">
            <Star size={16} />
            <span>Hint</span>
          </Button>

          <Button onClick={checkImageCompletion} className="flex items-center gap-2">
            <Check size={16} />
            <span>Check My Work</span>
          </Button>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {paintImages.map((img, index) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  completedImages[img.id]
                    ? "bg-green-500"
                    : currentImageIndex === index
                      ? "bg-purple-500"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
