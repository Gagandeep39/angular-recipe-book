import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Output() selectedRecipe : Recipe;

  constructor() { }

  ngOnInit() {
  }

  // 1. Data is Passed from recipe item as boolean  (Event Emitter - recipeSelected- void )
  // 2. Data is recived from recive Item in recipe-list (Event Binding - (recipeSelected)="esecuteFunction()")
  // 3. Data is passed from recipe-list in recipe (Even-Emitter - recipeWasSelected - recipe)
  // 4. Data is recieved in recipe by assigning $event to recipeObject  (Event BInding (recipeSelected = $event))
  // 5. Data is passed from recipe to recipe datails (Property Bunding - [recipe] = recipeSelected)

}
