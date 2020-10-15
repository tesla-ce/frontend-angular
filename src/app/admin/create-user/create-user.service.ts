import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json'/*,
        Authorization: 'my-auth-token'*/
    })
};

export interface User {
  username: string,
  firstName: string,
  lastName: string,
  email: string
}

@Injectable()
export class CreateUserService {
  usersUrl = 'https://demo.tesla-project.eu/api/v2/admin/user';

  constructor(private http: HttpClient) { }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('createUser', user))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/