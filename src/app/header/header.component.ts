import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from './../models/recipe.model';
import { DataStorageService } from './../services/data-storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.fetchDataFromServer();
  }

  saveDataToServer() {
    this.dataStorageService.saveDataToServer();
  }

  fetchDataFromServer() {
    this.dataStorageService.fetchDataFromServer().subscribe();
  }
}
