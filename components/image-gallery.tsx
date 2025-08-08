"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  heroImage?: string
  projectTitle?: string
}

export default function ImageGallery({ images, heroImage, projectTitle }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [showGallery, setShowGallery] = useState(false)

  const allImages = heroImage ? [heroImage, ...images] : images
  const displayImages = allImages.slice(0, 4)
  const remainingCount = Math.max(0, allImages.length - 4)

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setShowGallery(true)
  }

  const closeGallery = () => {
    setShowGallery(false)
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') closeGallery()
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openGallery(index)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${projectTitle} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  +{remainingCount} more
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Full Screen Gallery */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent 
          className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95"
          onKeyDown={handleKeyDown}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeGallery}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-10 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Main Image */}
            {selectedImageIndex !== null && (
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={allImages[selectedImageIndex] || "/placeholder.svg"}
                  alt={`${projectTitle} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* Image Counter */}
            {selectedImageIndex !== null && allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImageIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
