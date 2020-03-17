import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    // pathMatc: 'full' specifies if the path is completely empty then redirect to recipe 
    // This is because '' is present in every path
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent },
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