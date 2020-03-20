import { Router } from '@angular/router';
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

  // To clear the timer on manual log out
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

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
    // Expiry is returned in seconds, so we convert it into milliseconds
    const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expiryDate);
    this.userCredential.next(user);
    // Converting and saving data to lcoal storage
    localStorage.setItem('userData', JSON.stringify(user));
    // Auto logout timer will start executing as soon as the user is created
    this.autoLogOut(expiresIn * 1000);
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

  autoLogin() {
    // Fetches ythe local stored data as string -> Converts to Json
    // ****Wont work as date formated changes leading to error
    // const userData: User = JSON.parse(localStorage.getItem('userData'));
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.userCredential.next(loadedUser);
      // Future data(token expiry date) - current date will give us expiry time left
      const expiryDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expiryDuration);
    }
  }

  logOut() {
    this.userCredential.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // If we are auto-looged out it works fine
    // If we manually log out its necessary to stop the timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // Will execute logOut after expiration duration
  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }
}
// Inside catchError(this.handleError)
// handleError is a method passed as referece
// catctError provides a error response which is taken as parameter in handleError
// Handle error returns throwError
// Another substitue to this will be ->
// catchError(errorMesage=>handleError(errorMessage))
