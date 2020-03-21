import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  // pathMatc: 'full' specifies if the path is completely empty then redirect to recipe
  // This is because '' is present in every path
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

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
