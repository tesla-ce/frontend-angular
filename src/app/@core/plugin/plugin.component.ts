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
      // if (params['redirect_url']) this.router.navigateByUrl(params['redirect_url']);
      switch (url) {
        case '/plugin/ic': // ?institution_id => profile-ic
              this.router.navigateByUrl('/learner/ic');
          break;
        case '/plugin/enrolment': // ?institution_id&instruments&include_completed=0|1&redirect_uri => biometric-profile-enrolment
        this.router.navigateByUrl(`/course/${params.instrument_id}/report`);
          break;
        case '/plugin/activity/report': // ?activity:
            this.router.navigateByUrl(`/course/${params.course_id}/activity/${params.activity_id}/report`);
            break;
        case '/plugin/course/report': // course
          this.router.navigateByUrl(`/course/${params.course_id}/report`);
          break;
        case '/plugin/activity/configuration': //
          this.router.navigateByUrl(`/course/${params.course_id}/activity/${params.activity_id}/update`);
          break;
        default:
            this.router.navigateByUrl('/dashboard');
            break;
      }
    });
  }
}
