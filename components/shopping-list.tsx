import { ShoppingBasket } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ingredient } from "@/lib/types";

interface ShoppingListProps {
  ingredients: Record<
    string,
    Ingredient & { count: number; recipes: string[] }
  >;
}

export function ShoppingList({ ingredients }: ShoppingListProps) {
  const categories = Array.from(
    new Set(Object.values(ingredients).map((i) => i.category))
  ).sort();

  if (Object.keys(ingredients).length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <ShoppingBasket className="mb-4 size-12 opacity-20" />
        <p>Add recipes to generate your shopping list</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryIngredients = Object.values(ingredients).filter(
            (i) => i.category === category
          );

          return (
            <div key={category}>
              <h4 className="sticky top-0 z-10 mb-2 bg-background py-1 text-sm font-medium text-muted-foreground">
                {category}
              </h4>
              <ul className="space-y-2">
                {categoryIngredients.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border border-primary/50">
                        {/* Checkbox placeholder */}
                      </div>
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-xs text-muted-foreground">
                          Used in: {item.recipes.join(", ")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-xs font-medium">
                      {item.amount * item.count} {item.unit}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
