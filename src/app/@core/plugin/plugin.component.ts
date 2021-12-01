import { AuthService } from './../auth/auth.service';
import { InstitutionUser } from './../models/user';
import { Institution } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { nbAuthCreateToken, NbAuthOAuth2JWTToken, NbAuthService, NbAuthToken, NbTokenService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { ApiInstitutionService } from '../data/api-institution.service';
import * as Sentry from '@sentry/angular';

@Component({
  selector: 'ngx-tesla-plugin',
  template: ``,
})
export class PluginComponent implements OnInit {

  allowedDomains: string[];

  constructor(
      protected tokenService: NbTokenService,
      protected router: Router,
      private route: ActivatedRoute,
      private http: HttpClient,
      private userAuthService: AuthService,
      private authService: NbAuthService,
      private envService: EnvService,
      private apiInstitutionService: ApiInstitutionService,
    ) {

  }

  ngOnInit() {
    const redirectUrl = this.router.url.split('?')[0];
    this.route.queryParams.subscribe(params => {
      if (params['id'] && params['token']) {
        const url = this.envService.apiUrl + '/auth/token';
        const options = {
          observe: 'body' as const,
          responseType: 'json' as const,
          headers: new HttpHeaders({
            'Content-type': 'application/json; charset=utf-8',
          }),
        };
        this.http.post(url, {
          id: params['id'],
          token: params['token'],
        }, options).subscribe(result => {
          const token: NbAuthToken = nbAuthCreateToken(NbAuthOAuth2JWTToken,
            result, 'email');
          this.tokenService.set(token).subscribe(_ => {
            this.authService.isAuthenticatedOrRefresh().subscribe(authenticated => {
              const uri = this.envService.apiUrl + '/auth/profile';
              this.http.get(uri).subscribe((user: InstitutionUser) => {
                if (user) {
                  if (user.institution) {
                    this.apiInstitutionService.getInstitutionById(user.institution ? user.institution.id : user.institutions[0].id)
                    .subscribe((institution: Institution) => {
                      this.allowedDomains = institution.allowed_domains.split(',');
                      this.userAuthService.setIsAdmin(user.is_admin);
                      this.http.get(this.envService.apiUrl + '/institution/' + user.institution.id.toString() + '/learner/' + user.id)
                      .subscribe((learner: any) => {
                        if (learner.ic_status.startsWith('NOT_VALID')) this.router.navigateByUrl('/learner/ic');
                      });
                    });
                  } else {
                    user.institution = {
                        'name': 'UOC',
                        'acronym': 'uoc',
                        'id': 1,
                        'is_admin': true,
                        'locale': 'en',
                        'learner_id': null,
                    };
                  }
                  this.redirect(redirectUrl, params, user);
                } else throw user;
              });
            });
          },
          );
        });
      } else {
        const uri = this.envService.apiUrl + '/auth/profile';
        this.http.get(uri).subscribe((user: InstitutionUser) => {
          this.redirect(redirectUrl, params, user);
          /*
          this.apiInstitutionService.getInstitutionById(user.institution ? user.institution.id : user.institutions[0].id)
          .subscribe((institution: Institution) => {
            this.allowedDomains = institution.allowed_domains.split(',');

          });
          */
        });
      }
    });
  }

  redirect(url, params, user) {
      let isAllowed = false;
      if (params['redirect_uri'] === null || params['redirect_uri'] === undefined || params['redirect_uri'] === ['']
        || params['redirect_uri'] === '' ) {
        this.router.navigate(['/dashboard']);
        return;
      }

      const redirectUri = params['redirect_uri'].replace(/(^\w+:|^)\/\//, '');

      this.apiInstitutionService.getInstitutionById(user.institution ? user.institution.id : user.institutions[0].id)
        .subscribe((institution: Institution) => {
          this.allowedDomains = institution.allowed_domains.split(',');

          if (this.allowedDomains === null || this.allowedDomains === undefined || this.allowedDomains === ['']) {
            // accept all if allowedDomains is empty
            isAllowed = true;
          } else {
            this.allowedDomains.map(allowedDomain => {
              if (this.test(redirectUri, allowedDomain)) isAllowed = true;
            });

            if (isAllowed) {
              localStorage.setItem('lms_redirect_uri', params['redirect_uri']);
              localStorage.setItem('lms_redirect_uri_ts', new Date().toISOString());
            } else {
              Sentry.captureMessage(redirectUri + ' is not in the allowed domains ' + this.allowedDomains);
            }
          }
          switch (url) {
            case '/plugin/ic':
                  this.router.navigate(['/learner/ic']);
              break;
            case '/plugin/activity/reports':
                this.router.navigate([`/course/${params.course_id}/activity/${params.activity_id}/report`]);
                break;
            case '/plugin/activity/report':
              this.router.navigate([`/course/${params.course_id}/activity/${params.activity_id}/report/${params.report_id}`]);
              break;
            case '/plugin/activity/configuration':
              this.router.navigate([`/course/${params.course_id}/activity/${params.activity_id}/update`]);
              break;
            case '/plugin/course':
                this.router.navigate([`/course/${params.course_id}`]);
                break;
            case '/plugin/enrolment':
              this.router.navigate(['/enrolment']);
              break;
            case '/plugin/test-page':
                this.router.navigate(['/test']);
                break;
            default:
                this.router.navigate(['/dashboard']);
                break;
          }
      });
  }

  test(domain, pattern) {
    if (pattern.startsWith('*.')) {
      if (pattern.slice(2) === domain) return true;
    }
    const regexp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*?')}\$`);
    return regexp.test(domain);
  }
}
