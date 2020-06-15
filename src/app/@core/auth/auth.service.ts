import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {NbAuthService, NbAuthOAuth2JWTToken, NbTokenService} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {fakeAsync} from "@angular/core/testing";


export interface AuthInstitutionData {
  acronym: string;
  id: number;
  name: string;
  isAdmin: boolean;
}

export interface AuthUserData {
  firstName: string;
  lastName: string;
  uid?: string;
  isAdmin: boolean;
  institution?: AuthInstitutionData;
  email: string;
  picture?: string;
  fullName: string;
  locale?: string;
}

@Injectable()
export class AuthService extends NbRoleProvider {
  private time: Date = new Date;
  private userData = new BehaviorSubject<AuthUserData>(null);
  private readonly user = this.userData.asObservable();

  getRole(): Observable<string> {
    return observableOf('user');
  }

  getUser(): Observable<AuthUserData> {
    return this.user;
  }

  logOut(): void {
    this.authService.logout('email').subscribe( result => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  constructor(private authService: NbAuthService, protected http: HttpClient, protected router: Router) {
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
          const baseurl = 'http://localhost:8000';
          const url = baseurl + '/api/v2/auth/profile';
          this.http.get(url, options).subscribe( data => {
            let institution: AuthInstitutionData;
            if (data['institution']) {
              institution = Object.assign({}, {
                acronym: data['institution']['acronym'],
                id: data['institution']['id'],
                name: data['institution']['name'],
                isAdmin: false,
              });
            }
            this.userData.next(Object.assign({}, {
              firstName: data['first_name'],
              lastName: data['last_name'],
              email: data['email'],
              isAdmin: data['is_admin'],
              fullName: data['full_name'],
              locale: data['locale'],
              uid: data['locale'],
              institution,
            }));
          });
        } else {
          this.userData.next(null);
        }
      });
  }
}
