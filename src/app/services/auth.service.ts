import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  // Added an Optional parameter, additional value recieved during login
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey = 'AIzaSyA-fSMTaEMpolwMgHKZgAQJQk9Qi3NeYxI';
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  signInUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    // The response data will be an AuthResponseData object
    return this.http
      .post<AuthResponseData>(this.signUpUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'An error has Occured';
          if (errorResponse.error || errorResponse.error.error) {
            console.log('i was here');
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Try again later';
                break;
              default:
                break;
            }
          }
          return throwError(errorMessage);
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'An Error Has Occured';
          if (errorResponse.error || errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email doesn\'t Exist';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password';
                break;
              default:
                break;
            }
          }
          return throwError(errorMessage);
        })
      );
  }
}
