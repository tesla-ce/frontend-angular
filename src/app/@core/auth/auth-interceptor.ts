import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, iif, Observable, of, throwError} from 'rxjs';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {Router} from '@angular/router';
import {catchError, filter, finalize, mergeMap, switchMap, take} from 'rxjs/operators';
import {EnvService} from '../env/env.service';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  private AUTH_HEADER = 'Authorization';
  private token: NbAuthToken = null;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: NbAuthService, private router: Router, private envService: EnvService) {
    authService.onTokenChange().subscribe(token => {
      this.token = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
         // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req))),
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshTokenInProgress = false),
            );
          }
        } else {
          return throwError(error);
        }
      }),
    );
  }

  private refreshAccessToken(): Observable<any> {
    return this.authService.isAuthenticatedOrRefresh()
      .pipe(mergeMap(isAuth => iif(() => isAuth, this.authService.getToken(), of(null))));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    const matcher: string = this.envService.apiUrl;
    if (!request.url.match(matcher)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'JWT ' + this.token.getValue()),
    });
  }
}
