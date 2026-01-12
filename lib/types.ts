export interface Ingredient {
  name: string
  amount: number
  unit: string
  category: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  ingredients: Ingredient[]
  tags: string[]
  prepTime: number
}

export interface WeeklyPlanItem {
  id: string
  recipeId: string
  day: string
}
