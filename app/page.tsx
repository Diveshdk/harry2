"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import ProjectsSection from "@/components/projects-section"
import PublicationsSection from "@/components/publications-section"
import TestimonialsSection from "@/components/testimonials-section"
import InstagramSection from "@/components/instagram-section"
import Footer from "@/components/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-architecture.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-primary-300 text-sm font-medium tracking-wider uppercase">Master Planning</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Contextual
            <br />
            <span className="font-normal">Architectural Design</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Creating spaces that inspire and endure
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium group transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center px-4 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Innovative, Creative, Passionate,
              <br />
              <span className="font-normal">Multi-Disciplinary Team</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Hariom Jangid Architects is a young award-winning design consultancy that has earned the reputation of
              creating remarkably distinctive concepts. Established in 2010, our studio focuses on creating design
              masterpieces and has more than 15 million sq. ft. of built space under its belt with more at varying
              stages of design and construction.
            </p>
            <Button
              variant="outline"
              className="border-primary-500 text-primary-600 hover:bg-primary-50 bg-transparent"
            >
              Read More
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <div className="bg-primary-500 p-8 sm:p-12 rounded-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

              <div className="relative z-10 text-sm sm:text-base">
                <p className="opacity-80 mb-2">In a space filled with dreams,</p>
                <h3 className="text-2xl sm:text-3xl font-light mb-4">we are thinkers</h3>
                <p className="opacity-80 mb-4">With sights on a sky that knows no limit.</p>

                <p className="opacity-80 mb-2">In the area between points,</p>
                <h3 className="text-2xl sm:text-3xl font-light mb-4">we are movement</h3>
                <p className="opacity-80 mb-4">Reading between the lines to create a difference.</p>

                <p className="opacity-80 mb-2">In the construct of enterprise,</p>
                <h3 className="text-2xl sm:text-3xl font-light mb-4">we are conscious</h3>
                <p className="opacity-80 mb-4">Of needs and nature in light of the holistic picture.</p>

                <p className="opacity-80 mb-2">In a world of facades,</p>
                <h3 className="text-2xl sm:text-3xl font-light">we are open</h3>
                <p className="opacity-80">To evolve from passion to compassion.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ProjectsSection />
      <TestimonialsSection />
      <InstagramSection />
      <PublicationsSection />
      <Footer />
    </div>
  )
}
