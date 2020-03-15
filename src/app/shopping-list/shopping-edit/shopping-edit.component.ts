import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('quantityInput') quantityInputRef : ElementRef;
  @Output() ingredientAdded  = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
    const name = this.nameInputRef.nativeElement.value;
    const quantity = this.quantityInputRef.nativeElement.value;
    const newIngredient = new Ingredient(name, quantity);
    this.ingredientAdded.emit(newIngredient);
  }

}
