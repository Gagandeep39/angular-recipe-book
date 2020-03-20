import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

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

    // To make a common subscriber for login, signup
    let authObservable: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
