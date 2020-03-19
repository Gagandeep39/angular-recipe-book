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
    return this.http.get(this.server_url).subscribe(
      (responseList: Recipe[]) => {
        this.recipeService.setRecipes(responseList);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Fetched data from Server');
      }
    );
  }

  saveDataToServer() {
    // console.log(this.recipeService.getRecipes());
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
          console.log('Saved data to server');
          alert('Data Saved to server');
        }
      );
  }
}

// Post method will append new array in firebase
// It wil consits of uniquekey -> ID -> Recipe Object
// Pu method will replace the data in the server
// It will be as ID -> Object
