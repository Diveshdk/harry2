"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const PublicationsSection = () => {
  const publications = [
    {
      id: 1,
      year: "2025",
      title: "Sustainable Architecture",
      subtitle: "Can Green Roofs and Vertical Gardens Redefine Commercial Architecture",
      image: "/images/publication-1.jpg",
      category: "Research Paper",
    },
    {
      id: 2,
      year: "2025",
      title: "Urban Planning",
      subtitle: "The hidden impact of female architects in shaping iconic cityscapes",
      image: "/images/publication-2.jpg",
      category: "Article",
    },
    {
      id: 3,
      year: "2024",
      title: "Design Innovation",
      subtitle: "Women in real estate: Enduring appeal and transformative influence",
      image: "/images/publication-3.jpg",
      category: "Case Study",
    },
  ]

  return (
    <section id="publications" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">Publications & Research</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Our latest insights and research in architecture and design
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={publication.image || "/placeholder.svg"}
                    alt={publication.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {publication.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
                    {publication.year}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {publication.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{publication.subtitle}</p>
                  <Button
                    variant="ghost"
                    className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 p-0 h-auto font-medium group/btn self-start"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
            View All Publications
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default PublicationsSection
