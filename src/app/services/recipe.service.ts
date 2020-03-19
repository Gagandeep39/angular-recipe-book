import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Use EventEmitter only for event binding between a child and parent component
  recipeSelected = new Subject<Recipe>();
  // Import the component that recipe koist has changed
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  // Slice with no param returns a copy of an array
  // Without splice, the method will pass an array reference
  // Any data modified by components will be modified in services too
  // To prefent this behaviour, slice is added
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
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

  setRecipes(responseList: Recipe[]) {
    // this.recipes.push(...responseList);  // To append data to list 
    this.recipes = responseList; // Replacing current list with new One
    this.recipeChanged.next(this.recipes.slice());
  }
}
