import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.userCredential.pipe(
        // Take is used to run the guyard only once
      take(1),
      map(user => {
        // return user ? true : false;
        // return !!user;
        if (user) {
          return true;
        }
        this.router.navigate(['/auth']);
        // URLTree is a feature added in Angular 7
        // It reroutes if a particular route is blocked
        // return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
