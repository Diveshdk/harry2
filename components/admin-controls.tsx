"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { X, Plus } from "lucide-react"

interface AdminControlsProps {
  onProjectAdded?: () => void
  onDesignBoardAdded?: () => void
  onInstagramAdded?: () => void
}

export default function AdminControls({ onProjectAdded, onDesignBoardAdded, onInstagramAdded }: AdminControlsProps) {
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  const [showDesignBoardDialog, setShowDesignBoardDialog] = useState(false)
  const [showInstagramDialog, setShowInstagramDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentAction, setCurrentAction] = useState<"project" | "design" | "instagram" | null>(null)
  const [password, setPassword] = useState("")

  // Project form state
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

  // Design board form state
  const [designForm, setDesignForm] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  })

  // Instagram form state
  const [instagramForm, setInstagramForm] = useState({
    image: "",
    likes: 0,
    comments: 0,
    post_link: "",
    post_date: "",
    caption: "",
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case "p":
            event.preventDefault()
            setCurrentAction("project")
            setShowPasswordDialog(true)
            break
          case "b":
            event.preventDefault()
            setCurrentAction("design")
            setShowPasswordDialog(true)
            break
          case "i":
            event.preventDefault()
            setCurrentAction("instagram")
            setShowPasswordDialog(true)
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handlePasswordSubmit = () => {
    if (password === "hahaharry") {
      setShowPasswordDialog(false)
      setPassword("")

      switch (currentAction) {
        case "project":
          setShowProjectDialog(true)
          break
        case "design":
          setShowDesignBoardDialog(true)
          break
        case "instagram":
          setShowInstagramDialog(true)
          break
      }
    } else {
      toast.error("Incorrect password")
      setPassword("")
    }
  }

  const handleProjectSubmit = async () => {
    try {
      const { data, error } = await supabase.from("projects").insert([
        {
          ...projectForm,
          images: projectForm.images.filter((img) => img.trim() !== ""),
          content: projectForm.content.filter(
            (block) =>
              (block.type === "text" && block.content?.trim()) || (block.type === "image" && block.src?.trim()),
          ),
        },
      ])

      if (error) throw error

      toast.success("Project added successfully!")
      setShowProjectDialog(false)
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
      onProjectAdded?.()
    } catch (error) {
      toast.error("Error adding project")
      console.error(error)
    }
  }

  const handleDesignBoardSubmit = async () => {
    try {
      const { data, error } = await supabase.from("design_board").insert([designForm])

      if (error) throw error

      toast.success("Design board item added successfully!")
      setShowDesignBoardDialog(false)
      setDesignForm({
        title: "",
        category: "",
        image: "",
        description: "",
      })
      onDesignBoardAdded?.()
    } catch (error) {
      toast.error("Error adding design board item")
      console.error(error)
    }
  }

  const handleInstagramSubmit = async () => {
    try {
      const { data, error } = await supabase.from("instagram_posts").insert([instagramForm])

      if (error) throw error

      toast.success("Instagram post added successfully!")
      setShowInstagramDialog(false)
      setInstagramForm({
        image: "",
        likes: 0,
        comments: 0,
        post_link: "",
        post_date: "",
        caption: "",
      })
      onInstagramAdded?.()
    } catch (error) {
      toast.error("Error adding Instagram post")
      console.error(error)
    }
  }

  const addImageField = () => {
    setProjectForm((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }))
  }

  const updateImageField = (index: number, value: string) => {
    setProjectForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }))
  }

  const removeImageField = (index: number) => {
    setProjectForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addContentBlock = (type: "text" | "image") => {
    setProjectForm((prev) => ({
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
    setProjectForm((prev) => ({
      ...prev,
      content: prev.content.map((block, i) => (i === index ? { ...block, [field]: value } : block)),
    }))
  }

  const removeContentBlock = (index: number) => {
    setProjectForm((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }))
  }

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
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Project subtitle"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={projectForm.category}
                  onValueChange={(value) => setProjectForm((prev) => ({ ...prev, category: value }))}
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
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={projectForm.year}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, year: e.target.value }))}
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
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, area: e.target.value }))}
                  placeholder="1,500 m²"
                />
              </div>
              <div>
                <Label htmlFor="photographer">Photographer</Label>
                <Input
                  id="photographer"
                  value={projectForm.photographer}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, photographer: e.target.value }))}
                  placeholder="Photographer name"
                />
              </div>
              <div>
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={projectForm.client}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, client: e.target.value }))}
                  placeholder="Client name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="hero_image">Hero Image URL *</Label>
              <Input
                id="hero_image"
                value={projectForm.hero_image}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, hero_image: e.target.value }))}
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Project description"
                rows={3}
              />
            </div>

            {/* Images Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Project Images (Max 10)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageField}
                  disabled={projectForm.images.length >= 10}
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
              <Button variant="outline" onClick={() => setShowProjectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleProjectSubmit}>Add Project</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Design Board Dialog */}
      <Dialog open={showDesignBoardDialog} onOpenChange={setShowDesignBoardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Design Board Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="design-title">Title *</Label>
              <Input
                id="design-title"
                value={designForm.title}
                onChange={(e) => setDesignForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Design element title"
              />
            </div>
            <div>
              <Label htmlFor="design-category">Category *</Label>
              <Select
                value={designForm.category}
                onValueChange={(value) => setDesignForm((prev) => ({ ...prev, category: value }))}
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
                onChange={(e) => setDesignForm((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="design-description">Description</Label>
              <Textarea
                id="design-description"
                value={designForm.description}
                onChange={(e) => setDesignForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description of the design element"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDesignBoardDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleDesignBoardSubmit}>Add Item</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instagram Dialog */}
      <Dialog open={showInstagramDialog} onOpenChange={setShowInstagramDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Instagram Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="insta-image">Image URL *</Label>
              <Input
                id="insta-image"
                value={instagramForm.image}
                onChange={(e) => setInstagramForm((prev) => ({ ...prev, image: e.target.value }))}
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
                  onChange={(e) =>
                    setInstagramForm((prev) => ({ ...prev, likes: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="insta-comments">Comments</Label>
                <Input
                  id="insta-comments"
                  type="number"
                  value={instagramForm.comments}
                  onChange={(e) =>
                    setInstagramForm((prev) => ({ ...prev, comments: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="insta-link">Post Link</Label>
              <Input
                id="insta-link"
                value={instagramForm.post_link}
                onChange={(e) => setInstagramForm((prev) => ({ ...prev, post_link: e.target.value }))}
                placeholder="https://instagram.com/p/example"
              />
            </div>
            <div>
              <Label htmlFor="insta-date">Post Date *</Label>
              <Input
                id="insta-date"
                type="date"
                value={instagramForm.post_date}
                onChange={(e) => setInstagramForm((prev) => ({ ...prev, post_date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="insta-caption">Caption</Label>
              <Textarea
                id="insta-caption"
                value={instagramForm.caption}
                onChange={(e) => setInstagramForm((prev) => ({ ...prev, caption: e.target.value }))}
                placeholder="Instagram post caption"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowInstagramDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleInstagramSubmit}>Add Post</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
