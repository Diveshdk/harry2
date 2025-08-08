"use client"

import { motion } from "framer-motion"
import { Award, Users, Building, Calendar } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const stats = [
  { icon: Building, label: "Projects Completed", value: "150+" },
  { icon: Users, label: "Happy Clients", value: "200+" },
  { icon: Award, label: "Awards Won", value: "25+" },
  { icon: Calendar, label: "Years Experience", value: "15+" },
]

const timeline = [
  {
    year: "2010",
    title: "Foundation",
    description: "Hariom Jangid Architects was established with a vision to create innovative architectural solutions.",
  },
  {
    year: "2015",
    title: "First Major Award",
    description: "Received the 'Best Emerging Architect' award from the Indian Institute of Architects.",
  },
  {
    year: "2018",
    title: "Expansion",
    description: "Expanded operations to multiple cities and established a team of 50+ professionals.",
  },
  {
    year: "2020",
    title: "Sustainable Focus",
    description: "Shifted focus to sustainable architecture and green building technologies.",
  },
  {
    year: "2023",
    title: "International Recognition",
    description: "Gained international recognition for innovative sustainable design solutions.",
  },
]

export default function AboutPage() {
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
          <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">About Us</span>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Principal Architect & Founder of Hariom Jangid Architects, dedicated to creating innovative and sustainable
            architectural solutions.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">My Journey</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With over 15 years of experience in architectural design, I have dedicated my career to creating spaces
              that not only meet functional requirements but also inspire and elevate the human experience. My approach
              combines innovative design thinking with sustainable practices.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Throughout my career, I have had the privilege of working on diverse projects ranging from residential
              complexes to commercial buildings, each presenting unique challenges and opportunities for creative
              solutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              My philosophy centers around the belief that architecture should be contextual, sustainable, and
              meaningful. Every project is an opportunity to create something that contributes positively to its
              environment and community.
            </p>
          </div>
          <div className="bg-primary-500 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-light mb-6">Design Philosophy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Contextual Design</h4>
                <p className="text-primary-100 text-sm">
                  Creating architecture that responds to its environment and cultural context.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sustainable Practice</h4>
                <p className="text-primary-100 text-sm">
                  Integrating eco-friendly solutions and green technologies in every project.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Human-Centered</h4>
                <p className="text-primary-100 text-sm">
                  Designing spaces that enhance the quality of life for their users.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Journey Timeline</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-bold text-primary-500">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
