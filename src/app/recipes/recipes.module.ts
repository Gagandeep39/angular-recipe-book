import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    // All components declared inside recpies Module are declared here
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports: [
    // All the components that we want to use in other module are exported from her
    // Update -> We are using these internall via arouting
    // No other module is caling these compoents so we need not export these
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent
  ],
  imports: [
    // We need to exlicitly specify we use routing in this module
    // Without thus, <router-outlet> wont be recognized
    // We added it n root module, but everything works standlone so we have to specify it here too
    RouterModule,
    // We use directives such as (ngFor, ngIf etc)
    BrowserModule,
    // Added since we use reactive forms (formGroup, formArray)
    ReactiveFormsModule,
    // We dd not need HttpModule because it provides ***services and those are available application wide
    // HttpClientModule,
    // To Use routing in Recpies odule we declared all recoutes and imported it in this moduel
    RecipesRoutingModule,
  ]
})
export class RecipesModule {}
