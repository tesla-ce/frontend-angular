import { of as observableOf, Observable, BehaviorSubject, PartialObserver, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, Institution, InstitutionUser } from '../models/user';
import { EnvService } from '../env/env.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { ApiInstitutionService } from '../data/api-institution.service';
// import { apiConstants } from '../data/api-constants';


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
  private _institution: number;
  private _userInstitutions: any[];
  private _current_user: InstitutionUser = null;
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

  getInstitution(): Observable<Institution> {
    // return observableOf(localStorage.getItem('institution'));
    return observableOf(this._current_user.institution);
  }

  /**
   * Change current user institution
   * @param institutionId New institution ID
   */
  setInstitution(institutionId: string): void {
    localStorage.setItem('institution', institutionId);
    for (const institution of this._current_user.institutions) {
      if (institution.id === Number(institutionId)) {
        this._current_user.institution = institution;
        this._user.next(this._current_user);
        break;
      }
    }
  }

  getUserInstitutions(): Observable<any[]> {
    return observableOf(JSON.parse(localStorage.getItem('userInstitutions')));
  }

  setUserInstitutions(list: any[]): void {
    localStorage.setItem('userInstitutions', JSON.stringify(list));
  }

  setIsAdmin(isAdmin: boolean): void {
    this._isAdmin = isAdmin;
  }

  isAdmin(): boolean {
    return this._isAdmin;
  }

  logOut(): void {
    this.authService.logout('email').subscribe(result => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  constructor(
    private authService: NbAuthService,
    protected http: HttpClient,
    protected router: Router,
    protected route: ActivatedRoute,
    private apiInstitutionService: ApiInstitutionService,
    private envService: EnvService) {
    super();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        this.route.queryParams.subscribe(params => {
          if (token.isValid()) {
            const url = envService.apiUrl + '/auth/profile';
            this.http.get(url).subscribe((user: InstitutionUser) => {
              if (user) {
                this._isAdmin = user.is_admin;
                if (user.institution) {
                  // CHECK IC ONLY FOR LEARNERS
                  if (user.roles.includes('LEARNER')) {
                    http.get(envService.apiUrl + '/institution/' + user.institution.id.toString() + '/learner/' + user.id)
                      .subscribe((learner: any) => {
                        if (learner.ic_status.startsWith('NOT_VALID')) {
                          this.apiInstitutionService.getInstitutionById(user.institution ? user.institution.id : user.institutions[0].id)
                            .subscribe((institution: Institution) => {
                              const allowedDomains = institution.allowed_domains.split(',');
                              let isAllowed = false;
                              const redirectUri = params['redirect_uri'].replace(/(^\w+:|^)\/\//, '');
                              allowedDomains.map(allowedDomain => {
                                if (this.test(redirectUri, allowedDomain)) isAllowed = true;
                              });
                              if (isAllowed) {
                                localStorage.setItem('lms_redirect_uri', params['redirect_uri']);
                                localStorage.setItem('lms_redirect_uri_ts', new Date().toISOString());
                              }
                              this.router.navigate(['/learner/ic']);
                            });
                        }
                      });
                  }
                } else {
                  // When user has no assigned institution, take first available institution
                  if (user.institutions.length > 0) {
                    user.institution = user.institutions[0];
                    const userSelectedInstitution = localStorage.getItem('institution');
                    if (userSelectedInstitution) {
                      user.institution = user.institutions.filter(institution => institution.id.toString() === userSelectedInstitution)[0];
                    }
                    user.institution.is_admin = true;
                  }
                }
                this._current_user = user;
                this._user.next(user);
              } else throw user;
            });
          } else {
            this._user.next(null);
          }
        });
      });
  }

  test(domain, pattern) {
    if (pattern.startsWith('*.')) {
      if (pattern.slice(2) === domain) return true;
    }
    const regexp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*?')}`);
    return regexp.test(domain);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return ErrorObservable.create(error);
  }
}
