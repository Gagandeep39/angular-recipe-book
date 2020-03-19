import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  // Toggle between signup and login
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.logIn(email, password).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }

    form.reset();
  }
}
