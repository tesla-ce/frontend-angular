import {of as observableOf, Observable, BehaviorSubject, PartialObserver, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import {NbAuthService, NbAuthOAuth2JWTToken} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User, Institution, InstitutionUser} from '../models/user';
import {EnvService} from '../env/env.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';


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
  private _user = new BehaviorSubject<User>(null);
  private _isAdmin: boolean = false;
  private readonly user = this._user.asObservable();

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

  isAdmin(): boolean {
    return this._isAdmin;
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
          const url = envService.apiUrl + '/auth/profile';
          this.http.get(url).subscribe(( user: User ) => {
              if ( user ) {
                this._isAdmin = user.is_admin;
                this._user.next(user);
              } else throw user;
          });
          // this.http.get(url).pipe(
          //   map(( user: User ) => {
          //     console.log("before call next!", user);
          //     if ( user ) this._user.next(user);
          //     else throw user;
          //   }),
          //   catchError(this.handleError),
          // );
            // let institution: Institution;
            // let user: User | InstitutionUser = null;
            // if (data['institution']) {
            //   institution = Object.assign({}, {
            //     acronym: data['institution']['acronym'],
            //     id: data['institution']['id'],
            //     name: data['institution']['name'],
            //     isAdmin: false,
            //   });
            //   user = {
            //     firstName: data['first_name'],
            //     lastName: data['last_name'],
            //     email: data['email'],
            //     isAdmin: data['is_admin'],
            //     fullName: data['full_name'],
            //     locale: data['locale'],
            //     uid: data['uid'],
            //     username: data['username'],
            //     roles: data['roles'],
            //     institution,
            //   };
            // } else {
            //   user = {
            //     firstName: data['first_name'],
            //     lastName: data['last_name'],
            //     email: data['email'],
            //     isAdmin: data['is_admin'],
            //     fullName: data['full_name'],
            //     locale: data['locale'],
            //     username: data['username'],
            //     roles: data['roles'],
            //   };
            // }
            // this._user.next(Object.assign({}, user));
          // });
        } else {
          this._user.next(null);
        }
      });
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return ErrorObservable.create(error);
  }
}
