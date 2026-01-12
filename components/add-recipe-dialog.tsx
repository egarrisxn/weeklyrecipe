"use client";

import { useState, useId, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recipe, Ingredient } from "@/lib/types";

interface AddRecipeDialogProps {
  onAddRecipe: (recipe: Recipe) => void;
}

export function AddRecipeDialog({ onAddRecipe }: AddRecipeDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: 0, unit: "pcs", category: "Produce" },
  ]);

  const baseId = useId();
  const idCounter = useRef(0);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: 0, unit: "pcs", category: "Produce" },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = {
      id: `${baseId}-${idCounter.current++}`,
      title,
      description,
      image: "/diverse-food-spread.png", // Default placeholder
      prepTime: parseInt(prepTime) || 0,
      tags: ["Custom"],
      ingredients: ingredients.filter((i) => i.name.trim() !== ""),
    };

    onAddRecipe(newRecipe);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrepTime("");
    setIngredients([{ name: "", amount: 0, unit: "pcs", category: "Produce" }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Plus className="size-4" />
          Add Your Own Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Recipe</DialogTitle>
          <DialogDescription>
            Create a custom recipe to add to your collection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                placeholder="e.g., Grandma's Lasagna"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the dish..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prepTime">Prep Time (mins)</Label>
              <Input
                id="prepTime"
                type="number"
                placeholder="30"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ingredients</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddIngredient}
              >
                <Plus className="mr-1 size-3" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="grid flex-1 grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <Input
                        placeholder="Item name"
                        value={ingredient.name}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={ingredient.amount || ""}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "amount",
                            parseFloat(e.target.value)
                          )
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) =>
                          handleIngredientChange(index, "unit", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcs">pcs</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                          <SelectItem value="cup">cup</SelectItem>
                          <SelectItem value="tbsp">tbsp</SelectItem>
                          <SelectItem value="tsp">tsp</SelectItem>
                          <SelectItem value="whole">whole</SelectItem>
                          <SelectItem value="can">can</SelectItem>
                          <SelectItem value="bunch">bunch</SelectItem>
                          <SelectItem value="clove">clove</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Select
                        value={ingredient.category}
                        onValueChange={(value) =>
                          handleIngredientChange(index, "category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Cat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Produce">Produce</SelectItem>
                          <SelectItem value="Protein">Protein</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Grains">Grains</SelectItem>
                          <SelectItem value="Pantry">Pantry</SelectItem>
                          <SelectItem value="Frozen">Frozen</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveIngredient(index)}
                    disabled={ingredients.length === 1}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Recipe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
