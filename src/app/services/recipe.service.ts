import { Injectable, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  
  // Use EventEmitter only for event binding between a child and parent component
  recipeSelected = new Subject<Recipe>();
  // Import the component that recipe koist has changed 
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(
      "Burger",
      "A hamburger (also burger for short) is a food consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/428px-RedDot_Burger.jpg",
      [
        new Ingredient("Bread", 2),
        new Ingredient("Cabbage", 1)
      ]
    ),
    new Recipe(
      "Pasta",
      "Pasta is a type of food typically made from an unleavened dough of durum wheat flour",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg/377px-%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg",
      [
        new Ingredient("Wheat", 1),
        new Ingredient("Eggs", 2),
        new Ingredient("Flour", 1)
      ]
    )
  ];

  constructor(private shoppingListService : ShoppingListService) {}

  // Slice with no param returns a copy of an array
  // Without splice, the method will pass an array reference
  // Any data modified by components will be modified in services too
  // To prefent this behaviour, slice is added
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number){
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.shoppingListService.addMultipleIngredients(ingredients);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
