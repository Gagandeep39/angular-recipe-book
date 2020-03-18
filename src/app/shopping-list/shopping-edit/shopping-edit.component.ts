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

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    if(this.productForm.valid){
    const values = this.productForm.value;
    const newIngredient = new Ingredient(values.name, values.quantity);
    this.shoppingListService.addIngredients(newIngredient); 
    this.productForm.resetForm();
    }
  }

}
