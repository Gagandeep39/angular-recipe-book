import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is a Simple Recipe', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/beet.jpg'),
    new Recipe('Test Recipe 2', 'This is a Simple Recipe 2', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/beet.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(selectedRecipe : Recipe){
    this.recipeWasSelected.emit(selectedRecipe);
  }

}
