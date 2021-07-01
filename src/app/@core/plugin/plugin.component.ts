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
    this.route.queryParams.subscribe(params => {
      const url = this.router.url.split('?')[0];
      switch (url) {
        case '/plugin/ic':
              this.router.navigateByUrl('/learner/ic');
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
    });
  }
}
