import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('quantityInput') quantityInputRef : ElementRef;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    const name = this.nameInputRef.nativeElement.value;
    const quantity = this.quantityInputRef.nativeElement.value;
    const newIngredient = new Ingredient(name, quantity);
    this.shoppingListService.addIngredients(newIngredient); 
  }

}
