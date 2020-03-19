import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
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
    return this.http.post<AuthResponseData>(this.signUpUrl + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInUrl + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}
