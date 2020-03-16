import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { componentFactoryName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is a Simple Recipe', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/beet.jpg'),
    new Recipe('Test Recipe 2', 'This is a Simple Recipe 2', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/beet.jpg')
  ];

  constructor() { }

  // Slice with no param returns a copy of an array 
  // Without splice, the method will pass an array reference 
  // Any data modified by components will be modified in services too 
  // To prefent this behaviour, slice is added 
  getRecipes(){
    return this.recipes.slice();
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
  }
}
