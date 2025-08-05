"use client"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface AdminEditControlsProps {
  isVisible: boolean
  itemId: number
  itemType: "project" | "design_board" | "instagram_posts"
  onDelete?: () => void
  onEdit?: () => void
}

export default function AdminEditControls({ isVisible, itemId, itemType, onDelete, onEdit }: AdminEditControlsProps) {
  if (!isVisible) return null

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const { error } = await supabase.from(itemType).delete().eq("id", itemId)

      if (error) throw error

      toast.success("Item deleted successfully!")
      onDelete?.()
    } catch (error) {
      toast.error("Error deleting item")
      console.error(error)
    }
  }

  const handleEdit = () => {
    // For now, just show a toast. You can implement edit functionality later
    toast.info("Edit functionality coming soon!")
    onEdit?.()
  }

  return (
    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white" onClick={handleEdit}>
        <Edit className="h-3 w-3" />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  )
}
