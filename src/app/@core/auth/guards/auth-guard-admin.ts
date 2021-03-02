import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAdmin();
  }
}
