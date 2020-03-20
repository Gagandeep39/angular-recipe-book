import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';
import { Recipe } from './../models/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  server_url = 'https://flutter-intro-setup-gagan.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  // Fetch data returns an observable
  // Ppipe is used to format data
  // Take Reads one value from observable and unsubscribe i.e (auth subject observable)
  // Valuue is then passed to another obserbale created inside exhaush map
  // Exhaust map is used to combine 2 observables
  // Http get request is now sent from second obervable (1st being the one fetching user credential)
  // Http request now passes auth token as param to url (token recieved from auth subject observable)
  // Http resonse is then mapped in a modifide key value pairs
  // Outer map is an observable to map data
  // Inner map execute the code for each elemnt in array to prepare key value pairs
  // Tap ten sends the data to recipe servie class
  fetchDataFromServer() {
    return this.authService.userCredential.pipe(
      take(1),
      exhaustMap(userData => {
        return this.http.get<Recipe[]>(this.server_url);
      }),
      // To mprove the code and prevent breaking because of no ingredients(even though it ws working fine before)
      map(response => {
        console.log(response);
        // Lets us transform data
        return response.map(recipe => {
          return {
            ...recipe, // Returning the map as it is
            // If ingredients dont exist then append an empty array instead of null
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      // We have performed mapping isside pipe, so we will only recieve mapped data
      // Here event -> Recipe[]
      tap(event => {
        console.log(event);
        this.recipeService.setRecipes(event);
      })
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
// Tap method belongs to rxjs
// It is usually used to read events of response data and update ui
// The fetchData method() simply makes an Http class, its subscriber is in header component
// Subscre was removed from service so that resolver can call the method
