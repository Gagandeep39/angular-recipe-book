import { User } from './../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

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

  // Subject stores Logged In user's data
  // userCredential = new Subject<User>();
  // Provides a value instead of waiting for emission
  // rquires an initial value
  userCredential = new BehaviorSubject<User>(null);
  // userDataImmediate = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  // The response data will be an AuthResponseData object
  // Whenever user logs in or signs up, this data is fetched
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData =>
          this.createUser(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  createUser(email: string, id: string, token: string, expiresIn: number) {
    const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expiryDate);
    this.userCredential.next(user);
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData =>
          this.createUser(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An Error Has Occured';
    if (errorResponse.error || errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email doesn\'t Exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Password';
          break;
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
  }

  logOut() {
    this.userCredential.next(null);
  }
}
// Inside catchError(this.handleError)
// handleError is a method passed as referece
// catctError provides a error response which is taken as parameter in handleError
// Handle error returns throwError
// Another substitue to this will be ->
// catchError(errorMesage=>handleError(errorMessage))
