import { DataStorageService } from './data-storage.service';
import { Recipe } from './../models/recipe.model';
import { Resolve } from '@angular/router';

export class RecipeResolverSerive implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): Recipe[] | import('rxjs').Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataStorageService.fetchDataFromServer();
  }
}
