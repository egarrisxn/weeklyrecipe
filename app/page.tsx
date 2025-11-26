import { RecipePlanner } from "@/components/recipe-planner"
import { UtensilsCrossed } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            SmartPantry
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 lg:p-6">
        <RecipePlanner />
      </main>
    </div>
  )
}
