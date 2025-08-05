"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HomeProjectsSection from "@/components/home-projects-section"
import TestimonialsSection from "@/components/testimonials-section"
import InstagramSection from "@/components/instagram-section"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-architecture.jpg" alt="Modern Architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Designing Tomorrow's
              <span className="block text-primary-400">Architecture</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Creating innovative, sustainable, and inspiring architectural solutions that shape the future of our built
              environment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/projects">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg font-medium group transition-all duration-300"
                >
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium bg-transparent"
                >
                  About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-px h-8 bg-white/50 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Crafting Spaces That Inspire
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hariom Jangid Architects is a leading architectural firm dedicated to creating innovative, sustainable,
              and aesthetically pleasing spaces. With over a decade of experience, we specialize in residential,
              commercial, and public architecture.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our approach combines cutting-edge design with environmental consciousness, ensuring that every project
              not only meets our clients' needs but also contributes positively to the community and environment.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 bg-transparent"
              >
                Learn More About Us
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/modern-villa.jpg"
              alt="Modern Architecture"
              className="w-full h-96 sm:h-[500px] object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">15+</p>
                  <p className="text-sm text-gray-600">Awards Won</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Building, number: "150+", label: "Projects Completed" },
              { icon: Users, number: "200+", label: "Happy Clients" },
              { icon: Award, number: "15+", label: "Awards Won" },
              { icon: Building, number: "10+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <HomeProjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Instagram Section */}
      <InstagramSection />

      <Footer />
    </div>
  )
}
