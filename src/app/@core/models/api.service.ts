import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {NbAuthService, NbAuthOAuth2JWTToken} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User, Institution } from './user';
import {EnvService} from '../env/env.service';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable()
export class ApiService extends NbRoleProvider {
  private userData = new BehaviorSubject<User>(null);
  private readonly user = this.userData.asObservable();

  getRole(): Observable<string> {
    return observableOf('user');
  }

  getCurrentUser(): Observable<User> {
    return this.user;
  }

  constructor(private authService: NbAuthService, protected http: HttpClient, protected router: Router,
              private envService: EnvService) {
    super();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          const options = {
            observe: 'body' as const,
            responseType: 'json' as const,
            headers: new HttpHeaders({
              Authorization: 'JWT ' + token.getValue(),
              'Content-type': 'application/json; charset=utf-8',
            }),
          };
          const url = envService.apiUrl + '/auth/profile';
          this.http.get(url, options)
          .pipe(
            map(( user: User ) => {
              console.log(user);
              if ( user ) return user;
              else throw user;
            }),
            catchError(this.handleError),
          );
          // this.http.get(url, options).subscribe( data => {
          //   let institution: Institution;
          //   if (data['institution']) {
          //     institution = Object.assign({}, {
          //       acronym: data['institution']['acronym'],
          //       id: data['institution']['id'],
          //       name: data['institution']['name'],
          //       isAdmin: false,
          //     });
          //   }
          //   this.userData.next(Object.assign({}, {
          //     firstName: data['first_name'],
          //     lastName: data['last_name'],
          //     email: data['email'],
          //     username: data['username'],
          //     isAdmin: data['is_admin'],
          //     fullName: data['full_name'],
          //     locale: data['locale'],
          //     uid: data['institution']['id'],
          //     roles: data['roles'],
          //     institution,
          //   }));
          // });
        } else {
          this.userData.next(null);
        }
      });
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return ErrorObservable.create(error);
  }
}
