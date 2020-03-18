import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeChanged.subscribe((newRecipes: Recipe[]) => {
      this.recipes = newRecipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

}
