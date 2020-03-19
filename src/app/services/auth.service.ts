import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey = 'AIzaSyA-fSMTaEMpolwMgHKZgAQJQk9Qi3NeYxI';
  authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {

    // The response data will be an AuthResponseData object
    return this.http.post<AuthResponseData>(this.authUrl + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}
