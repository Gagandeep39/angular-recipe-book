import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.userCredential.pipe(
      take(1),
      exhaustMap(userData => {
        if (!userData) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().append('auth', userData.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
// It will fetch user credential from authService and unsubscribe the observsble
// The usre credential will be passed to next observable for operation
// The value will then be used to check if user token exists
// If yes then append it to header of requests
// If not then send requests without hesder
