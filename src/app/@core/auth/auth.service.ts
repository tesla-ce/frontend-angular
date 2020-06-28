import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {NbAuthService, NbAuthOAuth2JWTToken, NbTokenService} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, Institution, InstitutionUser} from '../models/users';
import {EnvService} from '../env/env.service';


export abstract class AuthUserData extends NbRoleProvider {
  abstract getUser(): Observable<User>;
  abstract logOut(): void;
  abstract getRole(): Observable<string>;
  abstract getRoles(): Observable<Array<string>>;
  abstract hasRole(role: string): Observable<boolean>;
}

@Injectable()
export class AuthService extends AuthUserData {
  private time: Date = new Date;
  private userData = new BehaviorSubject<User | InstitutionUser>(null);
  private readonly user = this.userData.asObservable();

  getRole(): Observable<string> {
    return observableOf('user');
  }

  hasRole(role: string): Observable<boolean> {
    return observableOf(true);
  }

  getRoles(): Observable<Array<string>> {
    return observableOf(['user']);
  }

  getUser(): Observable<User> {
    return this.user;
  }

  logOut(): void {
    this.authService.logout('email').subscribe( result => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  constructor(private authService: NbAuthService, protected http: HttpClient, protected router: Router,
              private envService: EnvService) {
    super();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          const url = envService.apiUrl + '/api/v2/auth/profile';
          this.http.get(url).subscribe( data => {
            let institution: Institution;
            let user: User | InstitutionUser = null;
            if (data['institution']) {
              institution = Object.assign({}, {
                acronym: data['institution']['acronym'],
                id: data['institution']['id'],
                name: data['institution']['name'],
                isAdmin: false,
              });
              user = {
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                isAdmin: data['is_admin'],
                fullName: data['full_name'],
                locale: data['locale'],
                uid: data['uid'],
                username: data['username'],
                institution,
              };
            } else {
              user = {
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                isAdmin: data['is_admin'],
                fullName: data['full_name'],
                locale: data['locale'],
                username: data['username'],
              };
            }
            this.userData.next(Object.assign({}, user));
          });
        } else {
          this.userData.next( null);
        }
      });
  }
}
