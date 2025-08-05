"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Trophy, Star, Medal } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const achievements = [
  {
    id: 1,
    title: "Best Emerging Architect 2015",
    organization: "Indian Institute of Architects",
    year: "2015",
    icon: Award,
    description: "Recognized for innovative design approach and sustainable architecture practices.",
  },
  {
    id: 2,
    title: "Sustainable Design Excellence",
    organization: "Green Building Council of India",
    year: "2018",
    icon: Trophy,
    description: "Awarded for outstanding contribution to green building design and implementation.",
  },
  {
    id: 3,
    title: "Architectural Innovation Award",
    organization: "National Architecture Awards",
    year: "2020",
    icon: Star,
    description: "Honored for revolutionary approach to contemporary residential architecture.",
  },
  {
    id: 4,
    title: "Excellence in Commercial Design",
    organization: "Commercial Architecture Society",
    year: "2021",
    icon: Medal,
    description: "Recognized for exceptional commercial building design and space optimization.",
  },
  {
    id: 5,
    title: "Lifetime Achievement in Architecture",
    organization: "Architectural Society of India",
    year: "2022",
    icon: Award,
    description: "Honored for significant contributions to Indian architecture over 15+ years.",
  },
  {
    id: 6,
    title: "International Design Recognition",
    organization: "World Architecture Community",
    year: "2023",
    icon: Trophy,
    description: "Global recognition for innovative sustainable architecture solutions.",
  },
]

const certifications = [
  {
    title: "LEED Accredited Professional",
    organization: "U.S. Green Building Council",
    year: "2017",
  },
  {
    title: "Certified Sustainable Designer",
    organization: "International Sustainable Design Council",
    year: "2019",
  },
  {
    title: "Advanced BIM Certification",
    organization: "Autodesk Certified Professional",
    year: "2020",
  },
]

const publications = [
  {
    title: "Featured in Architectural Digest India",
    description: "Cover story on sustainable residential design",
    year: "2022",
  },
  {
    title: "Published in Design Today Magazine",
    description: "Article on contemporary architectural trends",
    year: "2023",
  },
  {
    title: "International Architecture Review",
    description: "Featured project: Modern Villa Complex",
    year: "2023",
  },
]

export default function AchievementsPage() {
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
          <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Recognition</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Achievements & Awards
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey of recognition, innovation, and excellence in architectural design spanning over 15 years.
          </p>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Awards & Honors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-primary-500 text-sm font-medium">{achievement.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-primary-600 text-sm font-medium mb-3">{achievement.organization}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Professional Certifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Medal className="h-8 w-8 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-primary-600 text-sm font-medium mb-2">{cert.organization}</p>
                    <p className="text-gray-500 text-sm">{cert.year}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Publications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Media Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary-500 text-sm font-medium">{pub.year}</span>
                      <Star className="h-5 w-5 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{pub.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{pub.description}</p>
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
