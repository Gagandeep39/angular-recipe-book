import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe : Recipe;
  index: number;
  recipe: Recipe;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.index = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.index);
    })
  }

  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  editData(){
    // Possibility 1
    this.router.navigate(['edit'], {relativeTo: this.route});
    // Possibility 2
    // this.router.navigate(['../', this.index, 'edit'], {relativeTo: this.route});
  }

}
