import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  //Whenever a new ingredient is added, a new array will be passed to the emitter's subscriber
  ingredientsChanged = new Subject<Ingredient[]>();

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
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // '...' -> Spread operator converts array to list
  // List data can be directly added to an array at once using spread oeprator 
  addMultipleIngredients(ingredients : Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
