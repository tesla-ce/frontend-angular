import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { of as observableOf } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private authService: NbAuthService, private userService: AuthService) {
  }

  canActivate() {
    return observableOf(false);
  }
}
