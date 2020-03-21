import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const shoppingRoutes: Routes = [
  // { path: 'shoppinglist', component: ShoppingListComponent } // impement lazy loading
  { path: '', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    // CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingRoutes),
    SharedModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule { }
