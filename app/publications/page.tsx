"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User } from 'lucide-react'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { supabase, type Publication } from "@/lib/supabase"

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback publications data
  const fallbackPublications: Publication[] = [
    {
      id: 1,
      title: "Sustainable Architecture in Urban Planning",
      journal: "Architectural Review India",
      date: "2023-03-15",
      author: "Hariom Jangid",
      image: "/images/publication-1.jpg",
      description: "An in-depth analysis of sustainable design principles and their implementation in modern urban architecture.",
      link: "#",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 2,
      title: "Contemporary Design Trends",
      journal: "Design Today",
      date: "2023-01-20",
      author: "Hariom Jangid",
      image: "/images/publication-2.jpg",
      description: "Exploring the evolution of contemporary architectural design and its impact on modern living spaces.",
      link: "#",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 3,
      title: "Green Building Technologies",
      journal: "Eco Architecture Quarterly",
      date: "2022-11-10",
      author: "Hariom Jangid",
      image: "/images/publication-3.jpg",
      description: "Research on innovative green building technologies and their practical applications in construction.",
      link: "#",
      featured: false,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 4,
      title: "The Future of Residential Design",
      journal: "Home & Design Magazine",
      date: "2023-06-05",
      author: "Hariom Jangid",
      image: "/images/modern-villa.jpg",
      description: "Examining emerging trends in residential architecture and their impact on lifestyle and sustainability.",
      link: "#",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 5,
      title: "Commercial Architecture Innovation",
      journal: "Business Architecture Review",
      date: "2023-04-12",
      author: "Hariom Jangid",
      image: "/images/corporate-building.jpg",
      description: "How innovative commercial architecture is reshaping the modern workplace environment.",
      link: "#",
      featured: false,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    }
  ]

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("date", { ascending: false })

      if (error) {
        console.error("Database error:", error)
        setPublications(fallbackPublications)
      } else {
        setPublications(data && data.length > 0 ? data : fallbackPublications)
      }
    } catch (error) {
      console.error("Error fetching publications:", error)
      setPublications(fallbackPublications)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Publications & Research
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading publications...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border rounded-lg shadow-lg animate-pulse p-6">
                <div className="h-48 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Knowledge</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Publications & Research
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advancing architectural knowledge through research, publications, and thought leadership in sustainable design.
          </p>
        </motion.div>

        {/* Publications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Recent Publications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={publication.image || "/placeholder.svg"}
                      alt={publication.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {publication.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(publication.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{publication.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {publication.title}
                    </h3>
                    <p className="text-primary-500 text-sm font-medium mb-3">{publication.journal}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {publication.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary-50 bg-transparent"
                      onClick={() => publication.link && window.open(publication.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Publication
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
