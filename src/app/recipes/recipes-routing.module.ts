import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../services/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverSerive } from '../services/recipes-resolver.service';
import { NgModule } from '@angular/core';
const recipesRoutes: Routes = [
  // All recipes reclatde routes are not declred here
  {
    // path: 'recipes',
    path: '', // To implement lazy loading
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent }, // Must be before :id, to prevent 'new' from being interpreted as :id
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverSerive]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverSerive]
      }
    ]
  }
];
// Child/Feature odules use .forChild
@NgModule({
  // .forChil() is used for submodules
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
