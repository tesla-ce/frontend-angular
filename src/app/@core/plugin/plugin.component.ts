import { AuthService } from './../auth/auth.service';
import { InstitutionUser } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { nbAuthCreateToken, NbAuthOAuth2JWTToken, NbAuthService, NbAuthToken, NbTokenService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';

@Component({
  selector: 'ngx-tesla-plugin',
  template: ``,
})
export class PluginComponent implements OnInit {
  constructor(protected tokenService: NbTokenService, protected router: Router, private route: ActivatedRoute,
    private http: HttpClient, private userAuthService: AuthService, private authService: NbAuthService, private envService: EnvService) {

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
                  console.log(user);
                  if (user.institution) {
                    this.userAuthService.setIsAdmin(user.is_admin);
                    this.http.get(this.envService.apiUrl + '/institution/' + user.institution.id.toString() + '/learner/' + user.id)
                    .subscribe((learner: any) => {
                      if (learner.ic_status.startsWith('NOT_VALID')) this.router.navigateByUrl('/learner/ic');
                    });
                  } else {
                    user.institution = {
                        'name': 'UOC',
                        'acronym': 'uoc',
                        'id': 1,
                        'is_admin': true,
                        'locale': 'en',
                        'learner_id': null
                    };
                  }
                  this.redirect(redirectUrl, params);
                } else throw user;
              });
            });
          },
          );
        });
      } else {
        this.redirect(redirectUrl, params);
      }
    });
  }

  redirect(url, params) {
      switch (url) {
        case '/plugin/ic':
              // this.router.navigateByUrl('/learner/ic?' + params['redirect_uri']);
              this.router.navigate(['/learner/ic'], { queryParams: {
                redirect_uri: params['redirect_uri'],
              }});
          break;
        case '/plugin/activity/report':
            this.router.navigateByUrl(`/course/${params.course_id}/activity/${params.activity_id}/report`);
            break;
        case '/plugin/course/report':
          this.router.navigateByUrl(`/course/${params.course_id}/report`);
          break;
        case '/plugin/activity/configuration':
          this.router.navigateByUrl(`/course/${params.course_id}/activity/${params.activity_id}/update`);
          break;
        case '/plugin/enrolment':
          this.router.navigateByUrl('/enrolment');
          break;
        default:
            this.router.navigateByUrl('/dashboard');
            break;
      }
  }
}
