import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput') nameInputRef : ElementRef;
  // @ViewChild('quantityInput') quantityInputRef : ElementRef;
  @ViewChild('productForm') productForm: NgForm;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedIngredientEditing.subscribe((index) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(this.editItemIndex);
      this.productForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(){
    if(this.productForm.valid){
    const values = this.productForm.value;
    const newIngredient = new Ingredient(values.name, values.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredients(this.editItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredients(newIngredient); 
    }
    this.editMode = false;
    this.productForm.resetForm();
    }

  }
  
  clearForm() {
    this.productForm.resetForm();
    this.editMode = false;
  }

  // Delete button deltes the item selected fr update 
  // For adding new Ingredient, the button is not visible 
  deleteIngredient(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.clearForm();
  }

}
