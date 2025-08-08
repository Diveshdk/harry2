"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase, type Project, type DesignBoardItem, type InstagramPost, type Testimonial, type Achievement, type Publication } from "@/lib/supabase"
import { toast } from "sonner"
import { X, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface AdminControlsProps {
  onDataUpdated?: () => void
}

export default function AdminControls({ onDataUpdated }: AdminControlsProps) {
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("projects")
  const [operation, setOperation] = useState<"add" | "update" | "delete">("add")
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([])
  const [designItems, setDesignItems] = useState<DesignBoardItem[]>([])
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  
  // Form states
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    location: "",
    year: "",
    area: "",
    photographer: "",
    client: "",
    hero_image: "",
    description: "",
    images: [""],
    content: [{ type: "text" as const, content: "" }],
  })

  const [designForm, setDesignForm] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  })

  const [instagramForm, setInstagramForm] = useState({
    image: "",
    likes: 0,
    comments: 0,
    post_link: "",
    post_date: "",
    caption: "",
  })

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    rating: 5,
    text: "",
    featured: false,
  })

  const [achievementForm, setAchievementForm] = useState({
    title: "",
    organization: "",
    year: "",
    category: "award" as "award" | "certification" | "publication",
    icon: "Award",
    description: "",
    image: "",
    certificate_url: "",
    featured: false,
  })

  const [publicationForm, setPublicationForm] = useState({
    title: "",
    journal: "",
    date: "",
    author: "Hariom Jangid",
    image: "",
    description: "",
    link: "",
    featured: false,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "a") {
        event.preventDefault()
        setShowPasswordDialog(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handlePasswordSubmit = () => {
    if (password === "hahaharry") {
      setShowPasswordDialog(false)
      setPassword("")
      setShowAdminPanel(true)
      fetchAllData()
    } else {
      toast.error("Incorrect password")
      setPassword("")
    }
  }

  const fetchAllData = async () => {
    try {
      const [projectsRes, designRes, instagramRes, testimonialsRes, achievementsRes, publicationsRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("design_board").select("*").order("created_at", { ascending: false }),
        supabase.from("instagram_posts").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
        supabase.from("achievements").select("*").order("created_at", { ascending: false }),
        supabase.from("publications").select("*").order("created_at", { ascending: false }),
      ])

      if (projectsRes.data) setProjects(projectsRes.data)
      if (designRes.data) setDesignItems(designRes.data)
      if (instagramRes.data) setInstagramPosts(instagramRes.data)
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
      if (achievementsRes.data) setAchievements(achievementsRes.data)
      if (publicationsRes.data) setPublications(publicationsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const resetForms = () => {
    setProjectForm({
      title: "",
      subtitle: "",
      category: "",
      location: "",
      year: "",
      area: "",
      photographer: "",
      client: "",
      hero_image: "",
      description: "",
      images: [""],
      content: [{ type: "text", content: "" }],
    })
    setDesignForm({ title: "", category: "", image: "", description: "" })
    setInstagramForm({ image: "", likes: 0, comments: 0, post_link: "", post_date: "", caption: "" })
    setTestimonialForm({ name: "", role: "", company: "", image: "", rating: 5, text: "", featured: false })
    setAchievementForm({ title: "", organization: "", year: "", category: "award", icon: "Award", description: "", image: "", certificate_url: "", featured: false })
    setPublicationForm({ title: "", journal: "", date: "", author: "Hariom Jangid", image: "", description: "", link: "", featured: false })
    setSelectedItem(null)
  }

  const handleEdit = (item: any, type: string) => {
    setSelectedItem(item)
    setOperation("update")
    
    switch (type) {
      case "projects":
        setProjectForm({
          title: item.title || "",
          subtitle: item.subtitle || "",
          category: item.category || "",
          location: item.location || "",
          year: item.year || "",
          area: item.area || "",
          photographer: item.photographer || "",
          client: item.client || "",
          hero_image: item.hero_image || "",
          description: item.description || "",
          images: item.images && item.images.length > 0 ? item.images : [""],
          content: item.content && item.content.length > 0 ? item.content : [{ type: "text", content: "" }],
        })
        setActiveTab("projects")
        break
      case "design":
        setDesignForm({
          title: item.title || "",
          category: item.category || "",
          image: item.image || "",
          description: item.description || "",
        })
        setActiveTab("design")
        break
      case "instagram":
        setInstagramForm({
          image: item.image || "",
          likes: item.likes || 0,
          comments: item.comments || 0,
          post_link: item.post_link || "",
          post_date: item.post_date || "",
          caption: item.caption || "",
        })
        setActiveTab("instagram")
        break
      case "testimonials":
        setTestimonialForm({
          name: item.name || "",
          role: item.role || "",
          company: item.company || "",
          image: item.image || "",
          rating: item.rating || 5,
          text: item.text || "",
          featured: item.featured || false,
        })
        setActiveTab("testimonials")
        break
      case "achievements":
        setAchievementForm({
          title: item.title || "",
          organization: item.organization || "",
          year: item.year || "",
          category: item.category || "award",
          icon: item.icon || "Award",
          description: item.description || "",
          image: item.image || "",
          certificate_url: item.certificate_url || "",
          featured: item.featured || false,
        })
        setActiveTab("achievements")
        break
      case "publications":
        setPublicationForm({
          title: item.title || "",
          journal: item.journal || "",
          date: item.date || "",
          author: item.author || "Hariom Jangid",
          image: item.image || "",
          description: item.description || "",
          link: item.link || "",
          featured: item.featured || false,
        })
        setActiveTab("publications")
        break
    }
  }

  const handleDelete = async (id: number, table: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const { error } = await supabase.from(table).delete().eq("id", id)
      if (error) throw error

      toast.success("Item deleted successfully!")
      fetchAllData()
      onDataUpdated?.()
    } catch (error) {
      toast.error("Error deleting item")
      console.error(error)
    }
  }

  const handleSubmit = async (type: string) => {
    try {
      let data: any
      let table: string

      switch (type) {
        case "projects":
          data = {
            ...projectForm,
            images: projectForm.images.filter(img => img.trim() !== ""),
            content: projectForm.content.filter(block => 
              (block.type === "text" && block.content?.trim()) || 
              (block.type === "image" && block.src?.trim())
            ),
          }
          table = "projects"
          break
        case "design":
          data = designForm
          table = "design_board"
          break
        case "instagram":
          data = instagramForm
          table = "instagram_posts"
          break
        case "testimonials":
          data = testimonialForm
          table = "testimonials"
          break
        case "achievements":
          data = achievementForm
          table = "achievements"
          break
        case "publications":
          data = publicationForm
          table = "publications"
          break
        default:
          return
      }

      let result
      if (operation === "update" && selectedItem) {
        result = await supabase.from(table).update(data).eq("id", selectedItem.id)
      } else {
        result = await supabase.from(table).insert([data])
      }

      if (result.error) throw result.error

      toast.success(`${type} ${operation === "update" ? "updated" : "added"} successfully!`)
      resetForms()
      setOperation("add")
      fetchAllData()
      onDataUpdated?.()
    } catch (error) {
      toast.error(`Error ${operation === "update" ? "updating" : "adding"} ${type}`)
      console.error(error)
    }
  }

  const addImageField = () => {
    setProjectForm(prev => ({
      ...prev,
      images: [...prev.images, ""],
    }))
  }

  const updateImageField = (index: number, value: string) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }))
  }

  const removeImageField = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addContentBlock = (type: "text" | "image") => {
    setProjectForm(prev => ({
      ...prev,
      content: [
        ...prev.content,
        {
          type,
          content: type === "text" ? "" : undefined,
          src: type === "image" ? "" : undefined,
          caption: type === "image" ? "" : undefined,
        },
      ],
    }))
  }

  const updateContentBlock = (index: number, field: string, value: string) => {
    setProjectForm(prev => ({
      ...prev,
      content: prev.content.map((block, i) => (i === index ? { ...block, [field]: value } : block)),
    }))
  }

  const removeContentBlock = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }))
  }

  const renderItemsList = (items: any[], type: string) => (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">{item.title || item.name}</h4>
              <p className="text-sm text-gray-500">
                {item.category || item.role || item.journal || item.organization} • {item.year || item.date}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(item, type)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(item.id, type === "design" ? "design_board" : type === "instagram" ? "instagram_posts" : type)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <>
      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Enter Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                placeholder="Enter admin password"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Press Ctrl+A to access admin panel</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Panel */}
      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(projects, "projects")
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={projectForm.subtitle}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Project subtitle"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={projectForm.category}
                        onValueChange={(value) => setProjectForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Interior">Interior</SelectItem>
                          <SelectItem value="Sustainable">Sustainable</SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="2024"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="area">Area</Label>
                      <Input
                        id="area"
                        value={projectForm.area}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, area: e.target.value }))}
                        placeholder="1,500 m²"
                      />
                    </div>
                    <div>
                      <Label htmlFor="photographer">Photographer</Label>
                      <Input
                        id="photographer"
                        value={projectForm.photographer}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, photographer: e.target.value }))}
                        placeholder="Photographer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, client: e.target.value }))}
                        placeholder="Client name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hero_image">Hero Image URL *</Label>
                    <Input
                      id="hero_image"
                      value={projectForm.hero_image}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, hero_image: e.target.value }))}
                      placeholder="https://example.com/hero-image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Project description"
                      rows={3}
                    />
                  </div>

                  {/* Images Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Project Images</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImageField}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Image
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {projectForm.images.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={image}
                            onChange={(e) => updateImageField(index, e.target.value)}
                            placeholder="Image URL"
                          />
                          {projectForm.images.length > 1 && (
                            <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Blocks Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Content Blocks</Label>
                      <div className="space-x-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock("text")}>
                          Add Text
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock("image")}>
                          Add Image
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {projectForm.content.map((block, index) => (
                        <div key={index} className="border p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium capitalize">{block.type} Block</span>
                            <Button type="button" variant="outline" size="sm" onClick={() => removeContentBlock(index)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          {block.type === "text" ? (
                            <Textarea
                              value={block.content || ""}
                              onChange={(e) => updateContentBlock(index, "content", e.target.value)}
                              placeholder="Enter text content"
                              rows={3}
                            />
                          ) : (
                            <div className="space-y-2">
                              <Input
                                value={block.src || ""}
                                onChange={(e) => updateContentBlock(index, "src", e.target.value)}
                                placeholder="Image URL"
                              />
                              <Input
                                value={block.caption || ""}
                                onChange={(e) => updateContentBlock(index, "caption", e.target.value)}
                                placeholder="Image caption"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("projects")}>
                      {operation === "update" ? "Update" : "Add"} Project
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Design Tab */}
            <TabsContent value="design" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(designItems, "design")
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="design-title">Title *</Label>
                    <Input
                      id="design-title"
                      value={designForm.title}
                      onChange={(e) => setDesignForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Design element title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="design-category">Category *</Label>
                    <Select
                      value={designForm.category}
                      onValueChange={(value) => setDesignForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Materials">Materials</SelectItem>
                        <SelectItem value="Colors">Colors</SelectItem>
                        <SelectItem value="Lighting">Lighting</SelectItem>
                        <SelectItem value="Textures">Textures</SelectItem>
                        <SelectItem value="Layout">Layout</SelectItem>
                        <SelectItem value="Landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="design-image">Image URL *</Label>
                    <Input
                      id="design-image"
                      value={designForm.image}
                      onChange={(e) => setDesignForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="design-description">Description</Label>
                    <Textarea
                      id="design-description"
                      value={designForm.description}
                      onChange={(e) => setDesignForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description of the design element"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("design")}>
                      {operation === "update" ? "Update" : "Add"} Item
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Instagram Tab */}
            <TabsContent value="instagram" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(instagramPosts, "instagram")
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="insta-image">Image URL *</Label>
                    <Input
                      id="insta-image"
                      value={instagramForm.image}
                      onChange={(e) => setInstagramForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="insta-likes">Likes</Label>
                      <Input
                        id="insta-likes"
                        type="number"
                        value={instagramForm.likes}
                        onChange={(e) => setInstagramForm(prev => ({ ...prev, likes: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insta-comments">Comments</Label>
                      <Input
                        id="insta-comments"
                        type="number"
                        value={instagramForm.comments}
                        onChange={(e) => setInstagramForm(prev => ({ ...prev, comments: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="insta-link">Post Link</Label>
                    <Input
                      id="insta-link"
                      value={instagramForm.post_link}
                      onChange={(e) => setInstagramForm(prev => ({ ...prev, post_link: e.target.value }))}
                      placeholder="https://instagram.com/p/example"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insta-date">Post Date *</Label>
                    <Input
                      id="insta-date"
                      type="date"
                      value={instagramForm.post_date}
                      onChange={(e) => setInstagramForm(prev => ({ ...prev, post_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insta-caption">Caption</Label>
                    <Textarea
                      id="insta-caption"
                      value={instagramForm.caption}
                      onChange={(e) => setInstagramForm(prev => ({ ...prev, caption: e.target.value }))}
                      placeholder="Instagram post caption"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("instagram")}>
                      {operation === "update" ? "Update" : "Add"} Post
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(testimonials, "testimonials")
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="test-name">Name *</Label>
                    <Input
                      id="test-name"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-role">Role *</Label>
                    <Input
                      id="test-role"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="CEO, Homeowner, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-company">Company *</Label>
                    <Input
                      id="test-company"
                      value={testimonialForm.company}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name or location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-image">Image URL</Label>
                    <Input
                      id="test-image"
                      value={testimonialForm.image}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-rating">Rating</Label>
                    <Select
                      value={testimonialForm.rating.toString()}
                      onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="test-text">Testimonial Text *</Label>
                    <Textarea
                      id="test-text"
                      value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, text: e.target.value }))}
                      placeholder="Client testimonial text"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="test-featured"
                      checked={testimonialForm.featured}
                      onCheckedChange={(checked) => setTestimonialForm(prev => ({ ...prev, featured: !!checked }))}
                    />
                    <Label htmlFor="test-featured">Featured testimonial</Label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("testimonials")}>
                      {operation === "update" ? "Update" : "Add"} Testimonial
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(achievements, "achievements")
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ach-title">Title *</Label>
                    <Input
                      id="ach-title"
                      value={achievementForm.title}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Achievement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ach-organization">Organization *</Label>
                    <Input
                      id="ach-organization"
                      value={achievementForm.organization}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="Awarding organization"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ach-year">Year *</Label>
                      <Input
                        id="ach-year"
                        value={achievementForm.year}
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ach-category">Category *</Label>
                      <Select
                        value={achievementForm.category}
                        onValueChange={(value: "award" | "certification" | "publication") => 
                          setAchievementForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="award">Award</SelectItem>
                          <SelectItem value="certification">Certification</SelectItem>
                          <SelectItem value="publication">Publication</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ach-icon">Icon</Label>
                    <Select
                      value={achievementForm.icon}
                      onValueChange={(value) => setAchievementForm(prev => ({ ...prev, icon: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Award">Award</SelectItem>
                        <SelectItem value="Trophy">Trophy</SelectItem>
                        <SelectItem value="Star">Star</SelectItem>
                        <SelectItem value="Medal">Medal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ach-description">Description</Label>
                    <Textarea
                      id="ach-description"
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Achievement description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ach-image">Image URL</Label>
                    <Input
                      id="ach-image"
                      value={achievementForm.image}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/certificate.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ach-certificate">Certificate URL</Label>
                    <Input
                      id="ach-certificate"
                      value={achievementForm.certificate_url}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, certificate_url: e.target.value }))}
                      placeholder="https://example.com/certificate.pdf"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ach-featured"
                      checked={achievementForm.featured}
                      onCheckedChange={(checked) => setAchievementForm(prev => ({ ...prev, featured: !!checked }))}
                    />
                    <Label htmlFor="ach-featured">Featured achievement</Label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("achievements")}>
                      {operation === "update" ? "Update" : "Add"} Achievement
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => { setOperation("add"); resetForms(); }}
                >
                  Add New
                </Button>
                <Button 
                  variant={operation === "update" ? "default" : "outline"}
                  onClick={() => setOperation("update")}
                >
                  Update
                </Button>
                <Button 
                  variant={operation === "delete" ? "default" : "outline"}
                  onClick={() => setOperation("delete")}
                >
                  Delete
                </Button>
              </div>

              {operation === "delete" ? (
                renderItemsList(publications, "publications")
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pub-title">Title *</Label>
                    <Input
                      id="pub-title"
                      value={publicationForm.title}
                      onChange={(e) => setPublicationForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Publication title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pub-journal">Journal *</Label>
                    <Input
                      id="pub-journal"
                      value={publicationForm.journal}
                      onChange={(e) => setPublicationForm(prev => ({ ...prev, journal: e.target.value }))}
                      placeholder="Journal or publication name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pub-date">Date *</Label>
                      <Input
                        id="pub-date"
                        type="date"
                        value={publicationForm.date}
                        onChange={(e) => setPublicationForm(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pub-author">Author</Label>
                      <Input
                        id="pub-author"
                        value={publicationForm.author}
                        onChange={(e) => setPublicationForm(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pub-image">Image URL</Label>
                    <Input
                      id="pub-image"
                      value={publicationForm.image}
                      onChange={(e) => setPublicationForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/publication-image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pub-description">Description</Label>
                    <Textarea
                      id="pub-description"
                      value={publicationForm.description}
                      onChange={(e) => setPublicationForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Publication description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pub-link">Link</Label>
                    <Input
                      id="pub-link"
                      value={publicationForm.link}
                      onChange={(e) => setPublicationForm(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://example.com/publication"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pub-featured"
                      checked={publicationForm.featured}
                      onCheckedChange={(checked) => setPublicationForm(prev => ({ ...prev, featured: !!checked }))}
                    />
                    <Label htmlFor="pub-featured">Featured publication</Label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => { resetForms(); setOperation("add"); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmit("publications")}>
                      {operation === "update" ? "Update" : "Add"} Publication
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
