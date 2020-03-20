import { PlaceholderDirective } from './../shared/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';

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
  // To bind a var with ng-template with property appPlaceHolder using 'type' binding
  // This helper directive is created to manipulate the ng-template
  // @ViewChild('customAlert') wasnt working
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  // Subscriptber to dynamic component
  closeSubscriber: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        // To diplay error Component programatically
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  handleError() {
    this.error = null;
  }

  // Method that initializes the alert component programatically to display error
  showErrorAlert(error: string) {
    // Syntactically correct fo type script
    // Wrong for angular, as it handles components differertly
    // const alertComponent = new AlertComponent();
    // Creating a component
    const alertComponent = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    // Assigning a placeholder ng-template to a variable
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // Clearing previous content from placeholder
    hostViewContainerRef.clear();
    // Creating a component inside placeholder
    const tempComponent = hostViewContainerRef.createComponent(alertComponent);
    // Mainpulating data of the component
    // It is of type @input i.e we can sav data
    tempComponent.instance.message = error;
    // It is of @output i.e we can subscribe
    this.closeSubscriber = tempComponent.instance.close.subscribe(() => {
      // Here we cant call this method
      // this.handleError();
      // We will unsubscribe the sbscription from inside and clear the component
      this.closeSubscriber.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
