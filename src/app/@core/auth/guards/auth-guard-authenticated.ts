import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { iif, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardAuthenticated implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticatedOrRefresh()
    .pipe(
      mergeMap(isAuth => iif(() => isAuth, this.authService.getToken(), of(null))),
      map(token => {
        return token ? true : false;
      }),
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['auth/login']);
      }),
    );
  }
}
