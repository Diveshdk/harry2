"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Calendar, User, Camera, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ImageGallery from "@/components/image-gallery"
import AdminControls from "@/components/admin-controls"
import { supabase, type Project } from "@/lib/supabase"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProject(parseInt(params.id as string))
    }
  }, [params.id])

  const fetchProject = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching project:", error)
      } else {
        setProject(data)
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Project not found</h1>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AdminControls onDataUpdated={() => fetchProject(parseInt(params.id as string))} />

      {/* Back Button */}
      <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-8">
            <img
              src={project.hero_image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <Badge className="mb-4 bg-primary-500">{project.category}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2">{project.title}</h1>
              {project.subtitle && (
                <p className="text-lg sm:text-xl text-white/90">{project.subtitle}</p>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Details */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-light text-gray-900 mb-6">Project Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {project.description}
              </p>

              {/* Content Blocks */}
              {project.content && project.content.length > 0 && (
                <div className="space-y-8">
                  {project.content.map((block, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {block.type === "text" ? (
                        <div className="prose prose-lg max-w-none">
                          <p className="text-gray-600 leading-relaxed">{block.content}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <img
                            src={block.src || "/placeholder.svg"}
                            alt={block.caption || "Project image"}
                            className="w-full rounded-lg"
                          />
                          {block.caption && (
                            <p className="text-sm text-gray-500 italic text-center">{block.caption}</p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-8 sticky top-24"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-6">Project Details</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Year</p>
                    <p className="text-gray-600">{project.year}</p>
                  </div>
                </div>

                {project.area && (
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Area</p>
                      <p className="text-gray-600">{project.area}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Architect</p>
                    <p className="text-gray-600">{project.architect}</p>
                  </div>
                </div>

                {project.photographer && (
                  <div className="flex items-start space-x-3">
                    <Camera className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Photography</p>
                      <p className="text-gray-600">{project.photographer}</p>
                    </div>
                  </div>
                )}

                {project.client && (
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Client</p>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="px-4 max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-8">Project Gallery</h2>
            <ImageGallery 
              images={project.images} 
              heroImage={project.hero_image}
              projectTitle={project.title}
            />
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  )
}
