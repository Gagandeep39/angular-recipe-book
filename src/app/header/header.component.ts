import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output() visibilityStatus = new EventEmitter<{recipeStatus : boolean, shoppingStatus: boolean}>();


  constructor() { }

  ngOnInit() {
  }

  showShopping(){
    this.visibilityStatus.emit({recipeStatus : false, shoppingStatus : true});
  }

  showRecipes(){
    this.visibilityStatus.emit({recipeStatus : true, shoppingStatus : false});
  }

}
