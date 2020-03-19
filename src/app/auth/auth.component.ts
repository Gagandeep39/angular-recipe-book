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
  isLoading = false;
  // To display Error
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  // Toggle between signup and login
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.logIn(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.error = error.statusText + ' ' + error.status;
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.error = error.statusText + ' ' + error.status;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
