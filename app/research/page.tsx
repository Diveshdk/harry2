"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const publications = [
  {
    id: 1,
    title: "Sustainable Architecture in Urban Planning",
    journal: "Architectural Review India",
    date: "March 2023",
    author: "Hariom Jangid",
    image: "/images/publication-1.jpg",
    description:
      "An in-depth analysis of sustainable design principles and their implementation in modern urban architecture.",
    link: "#",
  },
  {
    id: 2,
    title: "Contemporary Design Trends",
    journal: "Design Today",
    date: "January 2023",
    author: "Hariom Jangid",
    image: "/images/publication-2.jpg",
    description: "Exploring the evolution of contemporary architectural design and its impact on modern living spaces.",
    link: "#",
  },
  {
    id: 3,
    title: "Green Building Technologies",
    journal: "Eco Architecture Quarterly",
    date: "November 2022",
    author: "Hariom Jangid",
    image: "/images/publication-3.jpg",
    description: "Research on innovative green building technologies and their practical applications in construction.",
    link: "#",
  },
]

export default function ResearchPage() {
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
            Research & Publications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advancing architectural knowledge through research, publications, and thought leadership in sustainable
            design.
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
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{publication.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{publication.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{publication.title}</h3>
                    <p className="text-primary-500 text-sm font-medium mb-3">{publication.journal}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{publication.description}</p>
                    <Button variant="outline" className="w-full group-hover:bg-primary-50 bg-transparent">
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
