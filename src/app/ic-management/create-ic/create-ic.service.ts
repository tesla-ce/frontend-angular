import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Ic } from '../../@core/models/ic';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json'/*,
        Authorization: 'my-auth-token'*/
    })
};

@Injectable()
export class CreateIcService {
  //TO DO: load institution from global selected institution
  icUrl = 'https://demo.tesla-project.eu/api/v2/institution/1/ic';
  
  constructor(private http: HttpClient) { }
  createIc(ic: Ic): Observable<Ic> {
    return this.http.post<Ic>(this.icUrl, ic, httpOptions)
      .pipe(
        //catchError(this.handleError('createIc', ic))
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
    // Return an observable with a ic-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/