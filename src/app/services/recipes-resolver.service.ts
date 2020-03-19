import { RecipeService } from 'src/app/services/recipe.service';
import { DataStorageService } from './data-storage.service';
import { Recipe } from './../models/recipe.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverSerive implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    console.log('Resolver was executed');
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchDataFromServer();
    } else {
      return recipes;
    }
  }
}
// HEre the resolver fetches from server everytime
// To prevent this we will check if service already has data in it
// In yes then the data will be returned else new data will  befetched
// Resolver runs before Edit Componet
// Value returned by resolver can be fetched from route.data.subscribe()
