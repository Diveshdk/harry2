"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface InstagramPost {
  id: string
  media_url: string
  media_type: string
  caption?: string
  permalink: string
  timestamp: string
  like_count?: number
  comments_count?: number
}

const InstagramSection = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data with real architectural images
  const mockPosts: InstagramPost[] = [
    {
      id: "1",
      media_url: "/images/instagram-1.jpg",
      media_type: "IMAGE",
      caption:
        "Contemporary villa design with clean lines and natural materials. #architecture #design #villa #hariomjangidarchitects",
      permalink: "https://instagram.com/p/example1",
      timestamp: "2024-01-15T10:30:00Z",
      like_count: 245,
      comments_count: 12,
    },
    {
      id: "2",
      media_url: "/images/instagram-2.jpg",
      media_type: "IMAGE",
      caption:
        "Urban planning project showcasing sustainable development principles. #urbanplanning #sustainability #architecture",
      permalink: "https://instagram.com/p/example2",
      timestamp: "2024-01-12T14:20:00Z",
      like_count: 189,
      comments_count: 8,
    },
    {
      id: "3",
      media_url: "/images/instagram-3.jpg",
      media_type: "IMAGE",
      caption: "Minimalist interior design concept for a corporate office space. #interiordesign #minimalism #office",
      permalink: "https://instagram.com/p/example3",
      timestamp: "2024-01-10T09:15:00Z",
      like_count: 312,
      comments_count: 18,
    },
    {
      id: "4",
      media_url: "/images/instagram-4.jpg",
      media_type: "IMAGE",
      caption:
        "Green building design incorporating renewable energy solutions. #greenbuilding #sustainable #architecture",
      permalink: "https://instagram.com/p/example4",
      timestamp: "2024-01-08T16:45:00Z",
      like_count: 156,
      comments_count: 6,
    },
    {
      id: "5",
      media_url: "/images/instagram-5.jpg",
      media_type: "IMAGE",
      caption: "Luxury residential complex with integrated community spaces. #residential #luxury #community #pool",
      permalink: "https://instagram.com/p/example5",
      timestamp: "2024-01-05T11:30:00Z",
      like_count: 278,
      comments_count: 15,
    },
    {
      id: "6",
      media_url: "/images/instagram-6.jpg",
      media_type: "IMAGE",
      caption:
        "Cultural center design celebrating local heritage and modern functionality. #culturalcenter #heritage #modern",
      permalink: "https://instagram.com/p/example6",
      timestamp: "2024-01-03T13:20:00Z",
      like_count: 203,
      comments_count: 9,
    },
  ]

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setTimeout(() => {
          setPosts(mockPosts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching Instagram posts:", error)
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const postDate = new Date(timestamp)
    const diffInDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const truncateCaption = (caption: string, maxLength = 100) => {
    if (!caption) return ""
    return caption.length > maxLength ? caption.substring(0, maxLength) + "..." : caption
  }

  return (
    <section className="py-16 sm:py-24 px-4 bg-accent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full p-0.5">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Instagram className="h-6 sm:h-8 w-6 sm:w-8 text-gray-800" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900">@hariomjangidarchitects</h3>
              <p className="text-gray-600 text-sm sm:text-base">{posts.length} posts</p>
            </div>
          </div>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base"
            onClick={() => window.open("https://instagram.com/hariomjangidarchitects", "_blank")}
          >
            Follow on Instagram
          </Button>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.media_url || "/placeholder.svg"}
                      alt="Instagram post"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-6 text-white">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 sm:h-6 w-5 sm:w-6" />
                          <span className="font-medium text-sm sm:text-base">{post.like_count}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6" />
                          <span className="font-medium text-sm sm:text-base">{post.comments_count}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instagram branding overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Instagram className="h-3 sm:h-4 w-3 sm:w-4" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">hariomjangidarchitects</p>
                            <p className="text-xs opacity-80">{formatTimeAgo(post.timestamp)}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20 p-1 sm:p-2"
                          onClick={() => window.open(post.permalink, "_blank")}
                        >
                          <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {truncateCaption(post.caption || "")}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 sm:h-4 w-3 sm:w-4" />
                          <span className="text-xs">{post.like_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4" />
                          <span className="text-xs">{post.comments_count}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{formatTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary-500 text-primary-600 hover:bg-primary-50 px-6 sm:px-8 py-3 bg-transparent group"
            onClick={() => window.open("https://instagram.com/hariomjangidarchitects", "_blank")}
          >
            <Instagram className="mr-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
            View More on Instagram
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramSection
