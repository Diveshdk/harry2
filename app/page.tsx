"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HomeProjectsSection from "@/components/home-projects-section"
import TestimonialsSection from "@/components/testimonials-section"
import InstagramSection from "@/components/instagram-section"
import AdminControls from "@/components/admin-controls"

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setShowLogo(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const refreshData = () => {
    // This will trigger re-fetch in child components
    window.location.reload()
  }

  if (showLogo) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="/images/hariom-jangid-logo.png"
              alt="Hariom Jangid Architects"
              className="h-24 w-auto mx-auto mb-4"
            />
          </motion.div>
          
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 mt-4"
          >
            Loading... {progress}%
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AdminControls onDataUpdated={refreshData} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-architecture.jpg"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-blue px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
              Designing Tomorrow's
              <span className="block text-primary-400">Architecture</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Creating sustainable, innovative spaces that inspire and endure for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-blue px-8 py-3">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href = "/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:black hover:text-gray-900 px-8 py-3"
              >
                About Us
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Crafting Spaces That Tell Stories
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With over 15 years of experience in architectural design, we specialize in creating innovative,
                sustainable spaces that reflect our clients' vision while respecting the environment and community.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our approach combines cutting-edge design with time-tested principles, resulting in architecture
                that is both beautiful and functional, contemporary yet timeless.
              </p>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/modern-villa.jpg"
                  alt="Modern Villa"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/images/corporate-building.jpg"
                  alt="Corporate Building"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-500 text-blue p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <HomeProjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Instagram Section */}
      <InstagramSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-blue mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-bluue/90 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your architectural vision to life with innovative design and sustainable solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-#4ECDC4 hover:bg-white hover:text-primary-600 px-8 py-3"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
