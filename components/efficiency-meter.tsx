import { Ingredient } from "@/lib/types"
import { AlertCircle, CheckCircle2, Leaf } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EfficiencyMeterProps {
  ingredients: Record<string, Ingredient & { count: number; recipes: string[] }>
  totalRecipes: number
}

export function EfficiencyMeter({ ingredients, totalRecipes }: EfficiencyMeterProps) {
  const ingredientList = Object.values(ingredients)
  const totalIngredients = ingredientList.length
  
  if (totalRecipes === 0) return null

  // Calculate "Single Use" ingredients (ingredients used in only 1 recipe)
  const singleUseIngredients = ingredientList.filter((i) => i.recipes.length === 1)
  const multiUseIngredients = ingredientList.filter((i) => i.recipes.length > 1)
  
  // Efficiency Score: Percentage of ingredients that are used in more than 1 recipe
  // This is a simplified metric for demo purposes
  const efficiencyScore = totalIngredients > 0 
    ? Math.round((multiUseIngredients.length / totalIngredients) * 100) 
    : 0

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Shopping Efficiency
            <span className={`text-lg font-bold ${efficiencyScore > 50 ? 'text-green-600' : 'text-orange-500'}`}>
              {efficiencyScore}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={efficiencyScore} className="h-2 mb-4" />
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-medium text-foreground">{multiUseIngredients.length} Shared Ingredients</span>
                <p className="text-xs">Great job! These items are being used across multiple meals.</p>
              </div>
            </div>
            
            {singleUseIngredients.length > 0 && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">{singleUseIngredients.length} Single-Use Items</span>
                  <p className="text-xs">Consider adding recipes that use: {singleUseIngredients.slice(0, 3).map(i => i.name).join(", ")}...</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {singleUseIngredients.length > 0 && (
        <div className="rounded-lg border bg-orange-50/50 p-4 dark:bg-orange-950/10">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-orange-600" />
            <h4 className="font-semibold text-sm text-orange-800 dark:text-orange-200">Reduce Waste Tip</h4>
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300">
            You have <strong>{singleUseIngredients[0].name}</strong> on your list for just one meal. 
            Try adding another recipe with {singleUseIngredients[0].name} to use it all up!
          </p>
        </div>
      )}
    </div>
  )
}
