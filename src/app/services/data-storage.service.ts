import { RecipeService } from './recipe.service';
import { Recipe } from './../models/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  server_url = 'https://flutter-intro-setup-gagan.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetchDataFromServer() {
    return this.http.get(this.server_url);
  }

  saveDataToServer() {
    this.http
      .put<{ recipes: Recipe[] }>(
        this.server_url,
        this.recipeService.getRecipes()
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Saved');
          alert('Dala Saved');
        }
      );
  }
}
