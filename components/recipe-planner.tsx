"use client"

import { useState, useMemo } from "react"
import { MOCK_RECIPES } from "@/lib/data"
import { Recipe, Ingredient } from "@/lib/types"
import { RecipeCard } from "@/components/recipe-card"
import { ShoppingList } from "@/components/shopping-list"
import { EfficiencyMeter } from "@/components/efficiency-meter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X, ChefHat, ShoppingCart, BarChart3 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AddRecipeDialog } from "@/components/add-recipe-dialog"

export function RecipePlanner() {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([])
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(MOCK_RECIPES)

  const addRecipe = (recipe: Recipe) => {
    if (!selectedRecipes.find((r) => r.id === recipe.id)) {
      setSelectedRecipes([...selectedRecipes, recipe])
    }
  }

  const handleAddNewRecipe = (newRecipe: Recipe) => {
    setAllRecipes([...allRecipes, newRecipe])
    // Optionally auto-select the new recipe
    addRecipe(newRecipe)
  }

  const removeRecipe = (recipeId: string) => {
    setSelectedRecipes(selectedRecipes.filter((r) => r.id !== recipeId))
  }

  // Aggregate ingredients
  const aggregatedIngredients = useMemo(() => {
    const acc: Record<string, Ingredient & { count: number; recipes: string[] }> = {}

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        // Normalize ingredient name for better matching (simple lowercase check)
        const key = ing.name.toLowerCase()
        
        if (acc[key]) {
          acc[key].amount += ing.amount
          acc[key].count += 1
          if (!acc[key].recipes.includes(recipe.title)) {
            acc[key].recipes.push(recipe.title)
          }
        } else {
          acc[key] = {
            ...ing,
            count: 1,
            recipes: [recipe.title],
          }
        }
      })
    })

    return acc
  }, [selectedRecipes])

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Recipe Library */}
      <div className="flex flex-col gap-4 lg:col-span-7 xl:col-span-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recipes</h2>
            <p className="text-muted-foreground">Select meals for your week</p>
          </div>
          <div className="flex items-center gap-2">
             <AddRecipeDialog onAddRecipe={handleAddNewRecipe} />
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-1 w-fit">
            <Button variant="ghost" size="sm" className="h-7 text-xs">All</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Mexican</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Healthy</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Custom</Button>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {allRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onAdd={addRecipe}
                isAdded={!!selectedRecipes.find((r) => r.id === recipe.id)}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Selected Recipes Bar (Mobile/Bottom or integrated) */}
        {selectedRecipes.length > 0 && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-medium">Your Plan ({selectedRecipes.length})</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex shrink-0 items-center gap-2 rounded-full border bg-background pl-3 pr-1 py-1 text-sm shadow-sm"
                >
                  <span className="truncate max-w-[100px]">{recipe.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-muted"
                    onClick={() => removeRecipe(recipe.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Shopping List & Analysis */}
      <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4">
        <div className="rounded-xl border bg-card shadow-sm h-full flex flex-col overflow-hidden">
          <Tabs defaultValue="list" className="flex h-full flex-col">
            <div className="border-b px-4 py-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Shopping List
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Efficiency
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden bg-muted/10">
              <TabsContent value="list" className="h-full m-0 p-4">
                <ShoppingList ingredients={aggregatedIngredients} />
              </TabsContent>
              
              <TabsContent value="analysis" className="h-full m-0 p-4">
                <div className="space-y-6">
                  <EfficiencyMeter 
                    ingredients={aggregatedIngredients} 
                    totalRecipes={selectedRecipes.length} 
                  />
                  
                  {selectedRecipes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <ChefHat className="mb-4 h-12 w-12 opacity-20" />
                      <p>Select recipes to see efficiency analysis</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
