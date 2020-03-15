import { Component } from '@angular/core';
import { load } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe'
  toggleVisibility(feature : string){
    this.loadedFeature = feature;
  }
}
