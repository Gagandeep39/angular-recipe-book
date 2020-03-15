import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipeVisible : boolean = true;
  shoppingVisible : boolean = false;

  toggleVisibility(status: {recipeStatus: boolean, shoppingStatus: boolean}){
    this.recipeVisible = status.recipeStatus;
    this.shoppingVisible = status.shoppingStatus;
  }
}
