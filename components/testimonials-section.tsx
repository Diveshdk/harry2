"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { supabase, type Testimonial } from "@/lib/supabase"

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback testimonials data
  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "CEO",
      company: "Tech Solutions Mumbai",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Hariom Jangid Architects transformed our vision into reality. Their attention to detail and innovative approach resulted in a workspace that truly reflects our company culture.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Homeowner",
      company: "Delhi",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Working with this team was an absolute pleasure. They created our dream home while staying within budget and timeline. The sustainable features are exactly what we wanted.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      role: "Hospital Director",
      company: "Bangalore Medical Center",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "The healthcare facility they designed for us is both functional and beautiful. Patient feedback has been overwhelmingly positive about the calming and modern environment.",
      featured: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
  ]

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3)

      if (error) {
        console.error("Database error:", error)
        setTestimonials(fallbackTestimonials)
      } else {
        setTestimonials(data && data.length > 0 ? data : fallbackTestimonials)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      setTestimonials(fallbackTestimonials)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  if (loading) {
    return (
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              What our clients say about working with us
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border rounded-lg shadow-lg animate-pulse p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-1" />
                    <div className="h-2 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">Client Testimonials</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            What our clients say about working with us
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary-500 mb-4" />
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder-user.jpg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-primary-600">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
