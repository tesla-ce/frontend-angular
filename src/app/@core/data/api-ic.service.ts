import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ic } from '../models/ic';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { InstitutionUser } from '../models/user';
// import { apiConstants } from './api-constants';

@Injectable({
  providedIn: 'root',
})
export class ApiIcService {

  apiUrl: string;
  endpoint: string;
  // document endpoint '/api/v2/institution/1/ic/2/document/ca/'
  endpointUrl: string;
  user: InstitutionUser;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private envService: EnvService,
  ) {
    this.apiUrl = envService.apiUrl;
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      this.user = user;
      this.endpoint = `/institution/${user.institution.id}/ic/`;
    });
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  // API: GET /ics
  // public getAllIcs():Observable<Ic[]> {
  //   // will use this.http.post()
  // }

  // API: POST /ics
  public createIc(fields: any) {
    // will use this.http.post()
    return this.http.post(this.endpointUrl, fields)
      .pipe(
        map((ic: Ic) => {
          // console.log(ic);
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /ics/:id
  public getIcById(icId: number): Observable<Ic> {
    return this.http
      .get(this.endpointUrl + icId)
      .pipe(
        map((ic: Ic) => {
          // console.log(ic);
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  public getCurrentIc(): Observable<Ic> {
    return this.http
      .get(this.endpointUrl
        + 'current')
      .pipe(
        map((ic: Ic) => {
          // console.log(ic);
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /ics/:id/:icId/document
  public getIcDocument(icId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + icId + '/document/')
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
        }),
        catchError(this.handleError),
      );
  }

  // API: POST /ics/document/
  public createDocument(idIc, fields): Observable<any> {
    const formData = new FormData();
    formData.append('language', fields.language);
    if (fields.pdf) formData.append('pdf', fields.pdf, fields.pdf?.name);
    formData.append('html', fields.html || '');
    if (fields.language) formData.append('language', fields.language);

    return this.http
      .post(this.endpointUrl + idIc + '/document/', formData).pipe(
        map((data: any) => {
          // console.log('Create Document Response', data);
          if (data.status) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }

  // API: PUT /ics/document/
  public updateDocument(idIc, fields, language): Observable<any> {

    const formData = new FormData();
    formData.append('language', fields.language);
    if (fields.pdf) formData.append('pdf', fields.pdf, fields.pdf?.name);
    // else formData.append('pdf', new Blob([], { type: 'text/plain' }));
    formData.append('html', fields.html || '');

    return this.http
      .put(this.endpointUrl + idIc + '/document/' + language + '/', formData,
    ).pipe(
      map((data: any) => {
        if (data.status) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  // API: PUT /ics/:id
  public updateIc(idIc, fields): Observable<any> {
    return this.http
      .put(this.endpointUrl + '/' + idIc, fields).pipe(
        map((data: any) => {
          if (data.status) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }


  // DELETE /ic/:id
  public deleteIcById(icId: number) {
    // will use this.http.delete()
  }

  // DELETE Langueg /ics/:id
  public deleteDocument(icID: number, documentLan: string) {
    return this.http
      .delete(this.endpointUrl + icID + '/document/' + documentLan + '/')
      .pipe(
        map((data: any) => {
          return true;
        }),
        catchError(this.handleError),
      );
    // will use this.http.delete()
  }

  // API: POST /institution/id/learner/id/ic
  public approveIc(userId, icVersion): Observable<any> {
    return this.http.post(`${this.apiUrl}/institution/${this.user.institution.id}/learner/${this.user.id}/ic/`,
     { version: icVersion }).pipe(
      map((data: any) => {
        if (data) {
          return data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  public rejectIc(userId, icVersion): Observable<any> {
    return this.http.delete(`${this.apiUrl}/institution/${this.user.institution.id}/learner/${this.user.id}/ic/`).pipe(
      map((data: any) => {
        if (data) {
          return data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }

  camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  snakeToCamelCase(str) {
    return str.replace(/[-_][a-z]/ig, letter => `${letter.toUpperCase()}`).replace('_', '');
  }

}
