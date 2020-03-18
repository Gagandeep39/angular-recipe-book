import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSubscription: Subscription;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe((newRecipes: Recipe[]) => {
      this.recipes = newRecipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }

}
