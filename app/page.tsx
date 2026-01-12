import { UtensilsCrossed } from "lucide-react";
import { RecipePlanner } from "@/components/recipe-planner";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </div>
            SmartPantry
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 lg:p-6">
        <RecipePlanner />
      </main>
    </div>
  );
}
