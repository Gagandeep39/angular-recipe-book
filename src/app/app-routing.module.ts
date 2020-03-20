import { AuthGuard } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverSerive } from './services/recipes-resolver.service';

const appRoutes: Routes = [
  // pathMatc: 'full' specifies if the path is completely empty then redirect to recipe
  // This is because '' is present in every path
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
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
  },
  { path: 'shoppinglist', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// When we try to access '/recipes/2' before fething server DataCue, the app will crash
// To fix this, We can create a guard or add a resolver
// Resolvre executes a set of code before a path is acccessed
// Here before accessing '/recipes/:id' data is fetched from serve
