import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe : Recipe;
  recipe: Recipe;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      const id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(id);
    })
  }

  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
