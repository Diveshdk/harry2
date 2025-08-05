"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Calendar, MapPin, User, Camera, Ruler, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { supabase, type Project } from "@/lib/supabase"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("id", params.id).single()

      if (error) throw error
      setProject(data)

      // Fetch related projects (same category, different id)
      if (data) {
        const { data: related, error: relatedError } = await supabase
          .from("projects")
          .select("*")
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(3)

        if (!relatedError) {
          setRelatedProjects(related || [])
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={project.hero_image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="absolute top-24 left-4 text-white hover:bg-white/20 z-10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Share Button */}
        <Button variant="ghost" className="absolute top-24 right-4 text-white hover:bg-white/20 z-10">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>

        {/* Project Title */}
        <div className="absolute bottom-8 left-4 right-4 text-white z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight">{project.title}</h1>
            {project.subtitle && <p className="text-xl md:text-2xl font-light opacity-90">{project.subtitle}</p>}
          </motion.div>
        </div>
      </section>

      {/* Project Info & Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Image Gallery Thumbnails */}
            {project.images && project.images.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {project.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden ${
                        index === 3 && project.images!.length > 4 ? "relative" : ""
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-24 md:h-32 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {index === 3 && project.images!.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">+{project.images!.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            {project.description && (
              <div className="mb-12">
                <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            )}

            {/* Detailed Content */}
            {project.content && project.content.length > 0 && (
              <div className="space-y-12">
                {project.content.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {section.type === "text" ? (
                      <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
                    ) : (
                      <div className="space-y-4">
                        <img
                          src={section.src || "/placeholder.svg"}
                          alt={section.caption || "Project image"}
                          className="w-full h-96 md:h-[500px] object-cover rounded-lg"
                        />
                        {section.caption && (
                          <p className="text-sm text-gray-500 italic text-center">{section.caption}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Project Information Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      {project.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Architects</p>
                        <p className="text-sm text-gray-600">{project.architect}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Year</p>
                        <p className="text-sm text-gray-600">{project.year}</p>
                      </div>
                    </div>

                    {project.area && (
                      <div className="flex items-start space-x-3">
                        <Ruler className="w-5 h-5 text-primary-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Area</p>
                          <p className="text-sm text-gray-600">{project.area}</p>
                        </div>
                      </div>
                    )}

                    {project.photographer && (
                      <div className="flex items-start space-x-3">
                        <Camera className="w-5 h-5 text-primary-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Photography</p>
                          <p className="text-sm text-gray-600">{project.photographer}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <Tag className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status</p>
                        <p className="text-sm text-gray-600">{project.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Link href="/contact">
                      <Button className="w-full bg-transparent" variant="outline">
                        Contact for Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProject.hero_image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{relatedProject.title}</h3>
                      <p className="text-sm text-gray-600">{relatedProject.category}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
