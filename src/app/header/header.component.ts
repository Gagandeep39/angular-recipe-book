import { AuthService } from './../services/auth.service';
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

  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    // this.fetchDataFromServer();
    this.authService.userCredential.subscribe(userData => {
      // Method 1
      // this.isAuthenticated = userData ? true : false;
      // Method 2
      // if user exists, then !userData will give false
      // another '!' wil make it true assigning value to isAuthenticated
      // console.log(!userData); if user exists, return false
      // console.log(!!userData); if userExists, return true
      this.isAuthenticated = !!userData;
    });
  }

  saveDataToServer() {
    this.dataStorageService.saveDataToServer();
  }

  fetchDataFromServer() {
    this.dataStorageService.fetchDataFromServer().subscribe();
  }

  logOut() {
    this.isAuthenticated = false;
    this.authService.logOut();
  }
}
