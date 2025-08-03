"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Architecture", "Interiors", "Research"]

  const projects = [
    {
      id: 1,
      title: "Urban Residential Complex",
      category: "Architecture",
      type: "Master Planning",
      image: "/images/modern-villa.jpg",
      description: "A sustainable residential development with integrated green spaces and contemporary design",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Architecture",
      type: "Commercial",
      image: "/images/corporate-building.jpg",
      description: "Contemporary office design with focus on natural light and collaborative workspaces",
    },
    {
      id: 3,
      title: "Luxury Villa Interior",
      category: "Interiors",
      type: "Residential",
      image: "/images/interior-design.jpg",
      description: "Sophisticated interior design blending comfort with contemporary elegance",
    },
    {
      id: 4,
      title: "Sustainable Design Study",
      category: "Research",
      type: "Research",
      image: "/images/sustainable-building.jpg",
      description: "Research on eco-friendly building materials and energy-efficient design solutions",
    },
    {
      id: 5,
      title: "Cultural Center",
      category: "Architecture",
      type: "Public",
      image: "/images/cultural-center.jpg",
      description: "Community space designed to celebrate local culture and arts with innovative architecture",
    },
    {
      id: 6,
      title: "Hotel Lobby Design",
      category: "Interiors",
      type: "Hospitality",
      image: "/images/hotel-lobby.jpg",
      description: "Welcoming lobby space with contemporary aesthetic and local cultural influences",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 bg-accent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">Latest Projects</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of innovative architectural solutions and interior designs
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-full p-2 shadow-sm">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                className={`rounded-full px-4 sm:px-6 py-2 text-sm transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-sm font-medium bg-primary-500 px-3 py-1 rounded-full">{project.type}</span>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <Button
                    variant="ghost"
                    className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 p-0 h-auto font-medium group/btn"
                  >
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
            className="border-primary-500 text-primary-600 hover:bg-primary-50 px-6 sm:px-8 py-3 bg-transparent"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
