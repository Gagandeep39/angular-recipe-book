import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  //Whenever a new ingredient is added, a new array will be passed to the emitter's subscriber
  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();

  ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  // We can pass data without slice if we ensure that it isnt edited outside in a wrong way
  // Better approach would to to use an emitter to inform that list has changed
  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(newIngredient : Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addMultipleIngredients(ingredientsList : Ingredient[]){
    ingredientsList.forEach(element => {
      this.ingredients.push(element);
    });
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
