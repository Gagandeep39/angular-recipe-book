import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const shoppingRoutes: Routes = [
  { path: 'shoppinglist', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingRoutes),
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule { }
