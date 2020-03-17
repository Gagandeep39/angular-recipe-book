import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";

const appRoutes: Routes = [
    // pathMatc: 'full' specifies if the path is completely empty then redirect to recipe 
    // This is because '' is present in every path
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: ':id', component: RecipeDetailComponent }
    ] },
    { path: 'shoppinglist', component: ShoppingListComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule{}