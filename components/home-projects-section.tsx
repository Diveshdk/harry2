"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const HomeProjectsSection = () => {
  // Only show 3 featured projects on homepage
  const featuredProjects = [
    {
      id: 1,
      title: "Modern Villa Complex",
      category: "Residential",
      type: "Master Planning",
      image: "/images/modern-villa.jpg",
      description: "A sustainable residential development with integrated green spaces and contemporary design",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      type: "Commercial",
      image: "/images/corporate-building.jpg",
      description: "Contemporary office design with focus on natural light and collaborative workspaces",
    },
    {
      id: 3,
      title: "Cultural Center",
      category: "Public",
      type: "Public",
      image: "/images/cultural-center.jpg",
      description: "Community space designed to celebrate local culture and arts with innovative architecture",
    },
  ]

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest architectural innovations and design solutions
          </p>
        </motion.div>

        {/* Projects Grid - Only 3 projects */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Link href={`/projects/${project.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white h-full cursor-pointer">
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
              </Link>
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
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-500 text-primary-600 hover:bg-primary-50 px-6 sm:px-8 py-3 bg-transparent"
            >
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeProjectsSection
