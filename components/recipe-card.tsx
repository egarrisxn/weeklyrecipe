import { Recipe } from "@/lib/types"
import { Clock, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface RecipeCardProps {
  recipe: Recipe
  onAdd: (recipe: Recipe) => void
  isAdded?: boolean
}

export function RecipeCard({ recipe, onAdd, isAdded }: RecipeCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant={isAdded ? "secondary" : "default"}
            className="h-8 w-8 rounded-full shadow-sm"
            onClick={() => onAdd(recipe)}
            disabled={isAdded}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add to plan</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{recipe.title}</h3>
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3.5 w-3.5" />
          {recipe.prepTime} mins
          <span className="mx-2">•</span>
          {recipe.ingredients.length} ingredients
        </div>
      </div>
    </div>
  )
}
