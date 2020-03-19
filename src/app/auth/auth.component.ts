import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;

  constructor() { }

  ngOnInit() {
  }

  // Toggle between signup and login
  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form);
    form.reset();
  }

}
