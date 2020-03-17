import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeItem') recipeItem : Recipe;
  @Input() index: number;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
  }

  onSelected(){
    // this.recipeService.recipeSelected.emit(this.recipeItem);
  }

}
