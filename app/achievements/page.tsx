"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Trophy, Star, Medal } from 'lucide-react'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { supabase, type Achievement } from "@/lib/supabase"

const iconMap = {
  Award,
  Trophy,
  Star,
  Medal,
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback achievements data
  const fallbackAchievements: Achievement[] = [
    {
      id: 1,
      title: "Best Emerging Architect 2015",
      organization: "Indian Institute of Architects",
      year: "2015",
      category: "award",
      icon: "Award",
      description: "Recognized for innovative design approach and sustainable architecture practices.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 2,
      title: "Sustainable Design Excellence",
      organization: "Green Building Council of India",
      year: "2018",
      category: "award",
      icon: "Trophy",
      description: "Awarded for outstanding contribution to green building design and implementation.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 3,
      title: "Architectural Innovation Award",
      organization: "National Architecture Awards",
      year: "2020",
      category: "award",
      icon: "Star",
      description: "Honored for revolutionary approach to contemporary residential architecture.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 4,
      title: "Excellence in Commercial Design",
      organization: "Commercial Architecture Society",
      year: "2021",
      category: "award",
      icon: "Medal",
      description: "Recognized for exceptional commercial building design and space optimization.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 5,
      title: "LEED Accredited Professional",
      organization: "U.S. Green Building Council",
      year: "2017",
      category: "certification",
      icon: "Medal",
      description: "Certified professional in Leadership in Energy and Environmental Design.",
      featured: false,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 6,
      title: "International Design Recognition",
      organization: "World Architecture Community",
      year: "2023",
      category: "award",
      icon: "Trophy",
      description: "Global recognition for innovative sustainable architecture solutions.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
  ]

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("year", { ascending: false })

      if (error) {
        console.error("Database error:", error)
        setAchievements(fallbackAchievements)
      } else {
        setAchievements(data && data.length > 0 ? data : fallbackAchievements)
      }
    } catch (error) {
      console.error("Error fetching achievements:", error)
      setAchievements(fallbackAchievements)
    } finally {
      setLoading(false)
    }
  }

  const awards = achievements.filter(a => a.category === 'award')
  const certifications = achievements.filter(a => a.category === 'certification')
  const publications = achievements.filter(a => a.category === 'publication')

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Achievements & Awards
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading achievements...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border rounded-lg shadow-lg animate-pulse p-6">
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
          <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Recognition</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Achievements & Awards
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey of recognition, innovation, and excellence in architectural design spanning over 15 years.
          </p>
        </motion.div>

        {/* Awards Section */}
        {awards.length > 0 && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Awards & Honors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award
                return (
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
                            <IconComponent className="h-6 w-6 text-primary-500" />
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
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
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
                  key={cert.id}
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
                      {cert.description && (
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed">{cert.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Publications Section */}
        {publications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Media Recognition</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
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
                      <p className="text-primary-600 text-sm font-medium mb-2">{pub.organization}</p>
                      {pub.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">{pub.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  )
}
