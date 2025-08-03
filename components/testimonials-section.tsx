"use client"

import { motion } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mr. Rajesh Kumar",
      position: "Director, Kumar Realty",
      image: "/placeholder.svg?height=80&width=80&text=RK",
      quote:
        "Working with Hariom Jangid Architects was an exceptional experience. They have a great sensibility for well-planned spaces and modern architecture. Most importantly, a great understanding of their clients requirements.",
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      position: "Managing Director, Wonderchef Home Appliance",
      image: "/placeholder.svg?height=80&width=80&text=PS",
      quote:
        "Hariom Jangid Architects has partnered with Wonderchef for the creation of our exclusive brand outlets. With their creative and design-oriented approach, they have helped the brand build an industry-leading model.",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      position: "Founder, Green Living Spaces",
      image: "/placeholder.svg?height=80&width=80&text=AP",
      quote:
        "Their commitment to sustainable design and innovative solutions has transformed our vision into reality. The attention to detail and professional execution exceeded our expectations.",
    },
  ]

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden group">
                <div className="absolute top-6 right-6 text-primary-500/20 group-hover:text-primary-500/30 transition-colors duration-500">
                  <Quote className="h-12 w-12" />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover mr-4 ring-4 ring-primary-50"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 text-base sm:text-lg">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed italic text-sm sm:text-base">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-8 sm:mt-12 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-full w-12 h-12 p-0 border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full w-12 h-12 p-0 border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
