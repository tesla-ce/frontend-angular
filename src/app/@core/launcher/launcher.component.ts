import {Component, OnInit} from '@angular/core';
import {nbAuthCreateToken, NbAuthOAuth2JWTToken, NbAuthService, NbAuthToken, NbTokenService} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-tesla-launcher',
  template: ``,
})
export class LauncherComponent implements OnInit {
  constructor(protected tokenService: NbTokenService, protected router: Router, private route: ActivatedRoute,
              private http: HttpClient, private authService: NbAuthService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const url = environment.apiUrl + '/api/v2/auth/token';
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
        this.tokenService.set(token).subscribe( _ => {
            this.authService.isAuthenticatedOrRefresh().subscribe( authenticated => {
                this.router.navigateByUrl('/dashboard');
            });
          },
        );
      });
    });
  }
}
