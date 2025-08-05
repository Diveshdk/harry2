"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AdminControls from "@/components/admin-controls"
import AdminEditControls from "@/components/admin-edit-controls"
import { supabase, type DesignBoardItem } from "@/lib/supabase"

const moodBoards = [
  {
    id: 1,
    title: "Contemporary Residential",
    images: [
      "/images/modern-villa.jpg",
      "/images/interior-design.jpg",
      "/images/sustainable-building.jpg",
      "/images/hotel-lobby.jpg",
    ],
  },
  {
    id: 2,
    title: "Commercial Spaces",
    images: [
      "/images/corporate-building.jpg",
      "/images/cultural-center.jpg",
      "/images/hotel-lobby.jpg",
      "/images/modern-villa.jpg",
    ],
  },
]

export default function DesignBoardPage() {
  const [designElements, setDesignElements] = useState<DesignBoardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdminControls, setShowAdminControls] = useState(false)

  useEffect(() => {
    fetchDesignElements()

    // Listen for Ctrl+D to show admin controls
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "d") {
        event.preventDefault()
        const password = prompt("Enter admin password:")
        if (password === "hahaharry") {
          setShowAdminControls(!showAdminControls)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showAdminControls])

  const fetchDesignElements = async () => {
    try {
      const { data, error } = await supabase.from("design_board").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setDesignElements(data || [])
    } catch (error) {
      console.error("Error fetching design elements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDesignBoardAdded = () => {
    fetchDesignElements()
  }

  const handleDesignBoardDeleted = () => {
    fetchDesignElements()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading design board...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AdminControls onDesignBoardAdded={handleDesignBoardAdded} />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Creative Process
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">Design Board</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our design process through curated mood boards, material palettes, and conceptual studies that
            inspire our architectural creations.
          </p>
        </motion.div>

        {/* Design Elements Grid */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Design Elements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative group">
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={element.image || "/placeholder.svg"}
                        alt={element.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs bg-primary-500 px-2 py-1 rounded-full">{element.category}</span>
                        <h3 className="text-lg font-semibold mt-2">{element.title}</h3>
                        <p className="text-sm opacity-90">{element.description}</p>
                      </div>
                    </div>
                  </Card>

                  <AdminEditControls
                    isVisible={showAdminControls}
                    itemId={element.id}
                    itemType="design_board"
                    onDelete={handleDesignBoardDeleted}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mood Boards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Mood Boards</h2>
          <div className="space-y-12">
            {moodBoards.map((board, boardIndex) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: boardIndex * 0.2 }}
              >
                <h3 className="text-2xl font-light text-gray-900 mb-6">{board.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {board.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      className="aspect-square overflow-hidden rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: imageIndex * 0.1 }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${board.title} mood ${imageIndex + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Color Palette Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Signature Color Palette</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-4 max-w-md">
              <div className="aspect-square bg-primary-500 rounded-lg shadow-lg"></div>
              <div className="aspect-square bg-gray-800 rounded-lg shadow-lg"></div>
              <div className="aspect-square bg-gray-400 rounded-lg shadow-lg"></div>
              <div className="aspect-square bg-gray-100 rounded-lg shadow-lg"></div>
              <div className="aspect-square bg-white border-2 border-gray-200 rounded-lg shadow-lg"></div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600">Our signature palette combines natural tones with contemporary accents</p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
